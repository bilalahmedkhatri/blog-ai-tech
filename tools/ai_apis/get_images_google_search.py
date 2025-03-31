import asyncio
import aiohttp
import logging
import uuid
from pathlib import Path
from typing import List, Optional, Dict, Tuple
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_SEARCH_ENGINE = os.getenv("GOOGLE_API_SEARCH_ENGINE")
GOOGLE_SEARCH_ENGINE = os.getenv("GOOGLE_SEARCH_ENGINE")

# Configure logging
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

class APIError(ImageDownloaderError):
    """Exception raised for API communication failures"""
    pass

async def search_and_download_images(
    query: str,
    download_folder: Path = Path("downloaded_images"),
    google_search_engine: Optional[str] = None,
    google_api: Optional[str] = None,
    max_concurrent_downloads: int = 10
) -> None:
    """
    Search and download images matching exact target sizes from multiple APIs asynchronously.

    Args:
        query: Search term for images
        download_folder: Path to save downloaded images (default: 'downloaded_images')
        google_key: google API access key
        pexels_key: Pexels API access key
        pixabay_key: Pixabay API access key
        max_concurrent_downloads: Maximum simultaneous downloads (default: 10)

    Raises:
        ImageDownloaderError: For critical operational failures
    """
    try:
        download_folder.mkdir(parents=True, exist_ok=True)
        async with aiohttp.ClientSession() as session:
            # Gather image URLs from all enabled APIs
            search_tasks = []
            if google_search_engine and google_api:
                search_tasks.append(_search_google(session, query, google_search_engine, google_api))

            search_results = await asyncio.gather(*search_tasks)
            all_images = [url for sublist in search_results for url in sublist]

            # newly added
            # Filter images by target sizes and organize by platform
            filtered_images = []
            for url, width, height in all_images:
                for platform, size in TARGET_SIZE.items():
                    if (width, height) == size:
                        filtered_images.append((url, platform))
                        break
                    
            # Download images with concurrency control
            semaphore = asyncio.Semaphore(max_concurrent_downloads)
            # platform variable newly added
            download_tasks = [
                _download_image(session, url, download_folder, platform, semaphore)
                for url, platform in filtered_images
            ]
            await asyncio.gather(*download_tasks)

    except Exception as e:
        logging.error(f"Critical operation failed: {str(e)}")
        raise ImageDownloaderError(f"Image download operation failed: {str(e)}") from e

async def _search_google(session: aiohttp.ClientSession, query: str, google_search_engine: str, google_api: str) -> List[Tuple[str, int, int]]:
    """Search google API for images"""
    try:
        url = "https://api.google.com/search/photos"
        params = {
            "query": query,
            "per_page": count,
            "client_id": api_key
        }

        async with session.get(url, params=params) as response:
            response.raise_for_status()
            data = await response.json()
            # return [item["urls"]["regular"] for item in data["results"]]
            # newly added
            return [
                (item["urls"]["raw"], item["width"], item["height"])
                for item in data["results"]
            ]

    except aiohttp.ClientError as e:
        logging.warning(f"google API request failed: {str(e)}")
        return []
    except KeyError as e:
        logging.warning(f"Unexpected response format from google API: {str(e)}")
        return []

async def _download_image(session: aiohttp.ClientSession, url: str, download_folder: Path, platform: str, semaphore: asyncio.Semaphore) -> None:
    """Download and save an individual image"""
    async with semaphore:
        try:
            # file_name =  download_folder / f"{uuid.uuid4().hex}.jpg"
            
            # newly added
            platform_folder = download_folder / platform
            platform_folder.mkdir(parents=True, exist_ok=True)
            file_name = platform_folder / f"{uuid.uuid4().hex}.jpg"
            
            async with session.get(url) as response:
                response.raise_for_status()
                content = await response.read()
                
                # Use thread pool executor for file IO
                loop = asyncio.get_running_loop()
                await loop.run_in_executor(
                    None,  # Uses default executor
                    lambda: file_name.write_bytes(content)
                )
                
                logging.info(f"Downloaded {platform} image: {file_name}")
                
        except aiohttp.ClientError as e:
            logging.warning(f"Failed to download {url}: {str(e)}")
        except Exception as e:
            logging.warning(f"Unexpected error processing {url}: {str(e)}")

# Example usage
if __name__ == "__main__":
    async def main():
        try:
            await search_and_download_images(
                query="kawasaki and Suzuki sports bikes",
                per_api_count=3,
                download_folder=Path("api_images"),
                google_search_engine=GOOGLE_SEARCH_ENGINE,
                google_api=GOOGLE_API_SEARCH_ENGINE
            )
        except ImageDownloaderError as e:
            logging.error(f"Image download process failed: {str(e)}")

    asyncio.run(main())