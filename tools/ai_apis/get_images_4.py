import asyncio
import aiohttp
import os
import logging
import uuid
from pathlib import Path
from typing import List, Optional, Dict, Tuple

# Configure environment variables
PEXELS_API_KEY = str(os.getenv("PEXELS_API_KEY"))
PIXABAY_API_KEY = str(os.getenv("PIXABAY_API_KEY"))

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler('image_downloader.log'), logging.StreamHandler()]
)

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
    Enhanced image downloader with API-specific organization and improved error handling.
    """
    try:
        download_folder.mkdir(parents=True, exist_ok=True)
        api_dirs = {
            "pexels": download_folder / "pexels",
            "pixabay": download_folder / "pixabay"
        }

        # Create API-specific directories
        for dir_path in api_dirs.values():
            dir_path.mkdir(exist_ok=True)

        async with aiohttp.ClientSession() as session:
            search_tasks = []
            if PEXELS_API_KEY:
                search_tasks.append(_search_pexels(
                    session, query, pexels_params or {}
                ))
                
            if PIXABAY_API_KEY:
                search_tasks.append(_search_pixabay(
                    session, query, pixabay_params or {}
                ))

            results = await asyncio.gather(*search_tasks)
            api_urls = [item for item in results if item]

            semaphore = asyncio.Semaphore(max_concurrent_downloads)
            download_tasks = []
            for api_name, urls in api_urls:
                logging.info(f"Received {len(urls)} results from {api_name.capitalize()} API")
                for url in urls:
                    download_tasks.append(
                        _download_image(
                            session, url, api_dirs[api_name], semaphore, api_name
                        )
                    )

            await asyncio.gather(*download_tasks)

    except Exception as e:
        logging.error(f"Operation failed: {str(e)}")
        raise ImageDownloaderError(f"Image download failed: {str(e)}") from e

async def _search_pexels(
    session: aiohttp.ClientSession,
    query: str,
    params: Dict
) -> Tuple[str, List[str]]:
    """Search Pexels API with enhanced error handling"""
    try:
        default_params = {
            "per_page": 20,
            "page": 1,
            "orientation": "landscape",
            "size": "large",
            "locale": "en-US"
        }
        final_params = {**default_params, **params}
        
        url = "https://api.pexels.com/v1/search"
        headers = {"Authorization": PEXELS_API_KEY}
        
        async with session.get(url, headers=headers, params=final_params) as response:
            await _check_rate_limits(response, "pexels")
            
            if response.status == 429:
                raise APIRateLimitError("Pexels API rate limit exceeded")
                
            data = await response.json()
            try:
                return ("pexels", [
                    photo["src"]["original"] 
                    for photo in data.get("photos", [])
                ])
            except KeyError as e:
                logging.warning(f"Pexels API response format error: {str(e)}")
                return ("pexels", [])

    except aiohttp.ClientError as e:
        logging.warning(f"Pexels API request failed: {str(e)}")
        return ("pexels", [])

async def _search_pixabay(
    session: aiohttp.ClientSession,
    query: str,
    params: Dict
) -> Tuple[str, List[str]]:
    """Search Pixabay API with enhanced error handling"""
    try:
        default_params = {
            "per_page": 30,
            "page": 1,
            "image_type": "photo",
            "safesearch": "true",
            "order": "popular",
            "lang": "en"
        }
        final_params = {**default_params, **params}
        
        url = "https://pixabay.com/api/"
        headers = {"Authorization": PEXELS_API_KEY}

        
        async with session.get(url, headers=headers, params={**final_params}) as response:
            await _check_rate_limits(response, "pixabay")
            
            if response.status == 429:
                raise APIRateLimitError("Pixabay API rate limit exceeded")
                
            data = await response.json()
            try:
                return ("pixabay", [
                    item["webformatURL"] 
                    for item in data.get("hits", [])
                ])
            except KeyError as e:
                logging.warning(f"Pixabay API response format error: {str(e)}")
                return ("pixabay", [])

    except aiohttp.ClientError as e:
        logging.warning(f"Pixabay API request failed: {str(e)}")
        return ("pixabay", [])

async def _download_image(
    session: aiohttp.ClientSession,
    url: str,
    api_dir: Path,
    semaphore: asyncio.Semaphore,
    api_name: str
) -> None:
    """Download image with API-specific handling"""
    async with semaphore:
        try:
            async with session.get(url) as response:
                response.raise_for_status()
                content = await response.read()
                
                file_name = api_dir / f"{uuid.uuid4().hex}.jpg"
                file_name.write_bytes(content)
                logging.info(f"Downloaded from {api_name}: {file_name}")

        except Exception as e:
            logging.warning(f"Error downloading from {api_name} ({url}): {str(e)}")

async def _check_rate_limits(response: aiohttp.ClientResponse, service: str) -> None:
    """Check and log API rate limits"""
    try:
        if service == "pexels":
            remaining = int(response.headers.get("X-Ratelimit-Remaining", 0))
            logging.info(f"Pexels API: {remaining} requests remaining")
            
        elif service == "pixabay":
            remaining = int(response.headers.get("X-RateLimit-Remaining", 0))
            logging.info(f"Pixabay API: {remaining} requests remaining")
            
    except Exception as e:
        logging.warning(f"Rate limit check failed for {service}: {str(e)}")

if __name__ == "__main__":
    async def main():
        try:
            await search_and_download_images(
                query="urban architecture",
                pexels_params={
                    "orientation": "square",
                    "color": "gray",
                    "per_page": 15
                },
                pixabay_params={
                    "category": "buildings",
                    "editors_choice": "true",
                    "min_width": 2500
                }
            )
        except ImageDownloaderError as e:
            logging.error(f"Image download failed: {str(e)}")
        except APIRateLimitError as e:
            logging.error(f"API Limit Error: {str(e)}")

    asyncio.run(main())