"""
Multi-Agent Media Search System with Error Handling and Parallel Execution
"""
import os
import asyncio
import aiohttp
import logging
from typing import List, Dict, Optional
from langchain.tools import Tool
from langchain.agents import AgentType, initialize_agent
from langchain.chat_models import ChatOpenAI
from retry import retry
from urllib.parse import quote_plus
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

class SearchAgent:
    """Base class for search engine agents"""
    
    def __init__(self, engine_name: str, api_key: str = None):
        self.engine_name = engine_name
        self.api_key = api_key or os.getenv(f"{engine_name.upper()}_API_KEY")
        self.session = aiohttp.ClientSession()
        self.logger = logging.getLogger(f"{self.engine_name}Agent")
        
    async def close(self):
        await self.session.close()

    @retry(tries=3, delay=2, backoff=2, logger=None)
    async def search_media(
        self,
        query: str,
        media_type: str = "image",
        orientation: Optional[str] = None,
        size: Optional[str] = None,
        limit: Optional[int] = None
    ) -> List[Dict]:
        """Search media with error handling and retry logic"""
        try:
            params = self._build_search_params(query, media_type, orientation, size, limit)
            async with self.session.get(self._build_url(), params=params) as response:
                response.raise_for_status()
                return await self._parse_results(await response.json())
        except aiohttp.ClientError as e:
            self.logger.error(f"Network error: {str(e)}")
            raise
        except Exception as e:
            self.logger.error(f"Search failed: {str(e)}")
            raise

    def _build_search_params(self, *args, **kwargs):
        """Engine-specific parameter builder (to be implemented by subclasses)"""
        raise NotImplementedError

    def _build_url(self):
        """Engine-specific URL builder (to be implemented by subclasses)"""
        raise NotImplementedError

    def _parse_results(self, response):
        """Engine-specific response parser (to be implemented by subclasses)"""
        raise NotImplementedError

class GoogleSearchAgent(SearchAgent):
    """Google Custom Search JSON API implementation"""
    
    def _build_url(self):
        return "https://www.googleapis.com/customsearch/v1"
    
    def _build_search_params(self, query, media_type, orientation, size, limit):
        params = {
            "key": self.api_key,
            "cx": os.getenv("GOOGLE_CSE_ID"),
            "q": query,
            "searchType": "image" if media_type == "image" else "",
            "num": min(limit, 10)  # Google's limit
        }
        if media_type == "image":
            if size: params["imgSize"] = size
            if orientation: params["imgOrientation"] = orientation
        return params
    
    def _parse_results(self, response):
        return [{"url": item["link"], "type": "image"} for item in response.get("items", [])]

class DuckDuckGoSearchAgent(SearchAgent):
    """DuckDuckGo implementation (requires proper API setup)"""
    
    def _build_url(self):
        return "https://api.duckduckgo.com/"
    
    def _build_search_params(self, query, media_type, orientation, size, limit):
        return {
            "q": query,
            "format": "json",
            "t": "media_search",
            "iax": "images" if media_type == "image" else "videos"
        }
    
    def _parse_results(self, response):
        return [{"url": result["url"], "type": "image"} for result in response.get("Results", [])]

async def download_media(url: str, save_dir: str = "downloads", timeout: int = 10):
    """Async media downloader with error handling"""
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=timeout) as response:
                response.raise_for_status()
                content = await response.read()
                
                os.makedirs(save_dir, exist_ok=True)
                filename = os.path.join(save_dir, url.split("/")[-1].split("?")[0])
                with open(filename, "wb") as f:
                    f.write(content)
                return filename
    except Exception as e:
        logging.error(f"Download failed for {url}: {str(e)}")
        return None

class MediaSearchOrchestrator:
    """Coordinate parallel searches and downloads"""
    
    def __init__(self, agents: List[SearchAgent]):
        self.agents = agents
        self.llm = ChatOpenAI(temperature=0)
        self.tools = self._create_tools()
        
    def _create_tools(self):
        return [
            Tool(
                name=f"{agent.engine_name}_search",
                func=lambda query: asyncio.run(agent.search_media(query)),
                description=f"Search {agent.engine_name} for media content"
            ) for agent in self.agents
        ]
    
    async def parallel_search(self, query: str, **kwargs):
        """Execute parallel searches across multiple engines"""
        search_tasks = [
            agent.search_media(query, **kwargs)
            for agent in self.agents
        ]
        results = await asyncio.gather(*search_tasks, return_exceptions=True)
        
        # Error handling for failed searches
        valid_results = []
        for agent, result in zip(self.agents, results):
            if isinstance(result, Exception):
                logging.error(f"{agent.engine_name} search failed: {str(result)}")
            else:
                valid_results.extend(result)
        return valid_results
    
    async def download_all(self, results: List[Dict], max_workers: int = 5):
        """Batch download with rate limiting"""
        semaphore = asyncio.Semaphore(max_workers)
        
        async def limited_download(url):
            async with semaphore:
                return await download_media(url)
                
        return await asyncio.gather(*[limited_download(r["url"]) for r in results])

# Example usage
async def main():
    try:
        # Initialize search agents
        agents = [
            GoogleSearchAgent("google"),
            DuckDuckGoSearchAgent("duckduckgo")
        ]
        
        # Create orchestrator
        orchestrator = MediaSearchOrchestrator(agents)
        
        # Perform parallel search
        results = await orchestrator.parallel_search(
            "mountain landscape",
            media_type="image",
            orientation="landscape",
            size="large",
            limit=5
        )
        
        # Download results
        await orchestrator.download_all(results)
        
        # LangChain integration example
        agent_executor = initialize_agent(
            orchestrator.tools,
            orchestrator.llm,
            agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True
        )
        
        # Use agent for complex queries
        agent_executor.run("Find high-resolution portrait images of historic architecture")
        
    finally:
        # Cleanup
        await asyncio.gather(*[agent.close() for agent in agents])

if __name__ == "__main__":
    asyncio.run(main())