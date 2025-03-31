import asyncio
import re
import aiohttp
import os
import logging
import uuid
from pathlib import Path
from typing import List, Optional, Dict
from dotenv import load_dotenv

load_dotenv()

# Configure environment variables
PEXELS_API_KEY = str(os.getenv("PEXELS_API_KEY"))
PIXABAY_API_KEY = str(os.getenv("PIXABAY_API_KEY"))

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler('image_downloader.log'), logging.StreamHandler()]
)

TARGET_SIZE = {
    "youtube": (1920, 1080),
    "instagram_feed": (1080, 1080),
    "instagram_story": (1080, 1920),
    "facebook": (1200, 630)
}

class ImageDownloaderError(Exception):
    """Base class for image downloader exceptions"""
    pass

class APIRateLimitError(ImageDownloaderError):
    """Exception raised for API rate limits"""
    pass

async def search_and_download_images(
    query: str,
    download_folder: Path = Path("downloaded_images"),
    pexels_params: Optional[Dict] = None,
    pixabay_params: Optional[Dict] = None,
    max_concurrent_downloads: int = 10
) -> None:
    """
    Advanced image downloader with API rate limit monitoring and parameter optimization.

    Args:
        query: Search term for images
        pexels_params: Dictionary of Pexels API parameters
        pixabay_params: Dictionary of Pixabay API parameters
    """
    try:
        download_folder.mkdir(parents=True, exist_ok=True)

        async with aiohttp.ClientSession() as session:
            search_tasks = []
            api_status = {}

            if PEXELS_API_KEY:
                search_tasks.append(_search_pexels(
                    session, query, pexels_params or {}
                ))
                
            if PIXABAY_API_KEY:
                search_tasks.append(_search_pixabay(
                    session, query, pixabay_params or {}
                ))

            results = await asyncio.gather(*search_tasks)
            print('results : ' , results )
            all_urls = list({url for sublist in results for url in sublist})

            semaphore = asyncio.Semaphore(max_concurrent_downloads)
            download_tasks = [
                _download_image(session, url, download_folder, semaphore)
                for url in all_urls
            ]
            await asyncio.gather(*download_tasks)

            # Log API status after operations
            _log_api_status(api_status)

    except Exception as e:
        logging.error(f"Operation failed: {str(e)}")
        raise ImageDownloaderError(f"Image download failed: {str(e)}") from e

async def _search_pexels(
    session: aiohttp.ClientSession,
    query: str,
    params: Dict
) -> List[str]:
    """Search Pexels API with enhanced parameters"""
    try:
        url = "https://api.pexels.com/v1/search"
        headers = {"Authorization": PEXELS_API_KEY}
        
        base_params = {
            "query": query,
            "per_page": params.get("per_page", 15),
            "page": params.get("page", 1),
            "orientation": params.get("orientation"),
            "size": params.get("size"),
            "color": params.get("color"),
            "locale": params.get("locale", "en-US")
        }
        
        async with session.get(url, headers=headers, params=base_params) as response:
            await _check_rate_limits(response, "pexels")
            
            if response.status == 429:
                raise APIRateLimitError("Pexels API rate limit exceeded")
                
            data = await response.json()
            return [photo["src"]["portrait"] for photo in data.get("photos", [])]

    except aiohttp.ClientError as e:
        logging.warning(f"Pexels API request failed: {str(e)}")
        return []
    
    except KeyError as e:
        logging.warning(f"Unexpected response format from Pexels API: {str(e)}")
        return []

async def _search_pixabay(
    session: aiohttp.ClientSession,
    query: str,
    params: Dict
) -> List[str]:
    """Search Pixabay API with enhanced parameters"""
    try:
        url = "https://pixabay.com/api/"
        
        base_params = {
            "key": PIXABAY_API_KEY,
            "q": query,
            "per_page": params.get("per_page", 20),
            "page": params.get("page", 1),
            "image_type": params.get("image_type", "photo"),
            "orientation": params.get("orientation", "vertical"),
            "category": params.get("category", "sports"),
            "min_width": params.get("min_width", ""),
            "colors": params.get("colors", ["black", "blue", "green", "yellow"]),
            "editors_choice": params.get("editors_choice", "false"),
            "safesearch": params.get("safesearch", "false"),
            "order": params.get("order", "latest"),
            "lang": params.get("lang", "en")
        }

        async with session.get(url, params=base_params) as response:
            await _check_rate_limits(response, "pixabay")
            
            if response.status == 429:
                raise APIRateLimitError("Pixabay API rate limit exceeded")
                
            data = await response.json()
            return [item["webformatURL"] for item in data.get("hits", [])]

    except aiohttp.ClientError as e:
        logging.warning(f"Pixabay API request failed: {str(e)}")
        return []
    
    except KeyError as e:
        logging.warning(f"Unexpected response format from Pixabay API: {str(e)}")
        return []

async def _download_image(
    session: aiohttp.ClientSession,
    url: str,
    download_folder: Path,
    semaphore: asyncio.Semaphore
) -> None:
    """Download image with concurrency control"""
    async with semaphore:
        try:
            async with session.get(url) as response:
                response.raise_for_status()
                content = await response.read()
                
                file_name = download_folder / f"{uuid.uuid4().hex}.jpg"
                file_name.write_bytes(content)
                logging.info(f"Downloaded: {file_name}")

        except Exception as e:
            logging.warning(f"Error downloading {url}: {str(e)}")

async def _check_rate_limits(response: aiohttp.ClientResponse, service: str) -> None:
    """Check and log API rate limits"""
    try:
        if service == "pexels":
            remaining = int(response.headers.get("X-Ratelimit-Remaining", 0))
            reset_time = int(response.headers.get("X-Ratelimit-Reset", 0))
            logging.info(f"Pexels API: {remaining} requests remaining, reset in {reset_time} seconds")

        elif service == "pixabay":
            remaining = int(response.headers.get("X-RateLimit-Remaining", 0))
            limit = int(response.headers.get("X-RateLimit-Limit", 0))
            logging.info(f"Pixabay API: {remaining}/{limit} requests remaining")

    except Exception as e:
        logging.warning(f"Rate limit check failed: {str(e)}")

def _log_api_status(status: Dict) -> None:
    """Log final API status"""
    logging.info("API Status Summary:")
    logging.info(f"Pexels: {status.get('pexels', 'N/A')}")
    logging.info(f"Pixabay: {status.get('pixabay', 'N/A')}")

if __name__ == "__main__":
    async def main():
        try:
            await search_and_download_images(
                query="Honda CBR 700 bike",
                pexels_params={
                    "per_page": 10,
                    "page": 2,
                    "orientation": "portrait",
                    "size": "large",
                    "color": "blue"
                },
                pixabay_params={
                    "per_page": 15,
                    "page": 2,
                    "image_type": "photo",
                    "category": "travel",
                    "order": "popular"
                }
            )
        except ImageDownloaderError as e:
            logging.error(f"Image download failed: {str(e)}")

    asyncio.run(main())