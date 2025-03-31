import asyncio
import aiohttp
import logging
import uuid
from pathlib import Path
from typing import List, Optional, Dict, Tuple
from dotenv import load_dotenv
import os

load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler('image_downloader.log'), logging.StreamHandler()]
)

UNSPLASH_API_KEY = os.getenv("UNSPLASH_API_KEY")
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
PIXABAY_API_KEY = os.getenv("PIXABAY_API_KEY")

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
    unsplash_key: Optional[str] = None,
    pexels_key: Optional[str] = None,
    pixabay_key: Optional[str] = None,
    max_concurrent_downloads: int = 10
) -> None:
    """
    Search and download images matching exact target sizes from multiple APIs asynchronously.

    Args:
        query: Search term for images
        download_folder: Path to save downloaded images (default: 'downloaded_images')
        unsplash_key: Unsplash API access key
        pexels_key: Pexels API access key
        pixabay_key: Pixabay API access key
        max_concurrent_downloads: Maximum simultaneous downloads (default: 10)

    Raises:
        ImageDownloaderError: For critical operational failures
    """
    try:
        download_folder.mkdir(parents=True, exist_ok=True)
        async with aiohttp.ClientSession() as session:
            # Gather image data from all enabled APIs
            search_tasks = []
            if unsplash_key:
                search_tasks.append(_search_unsplash(session, query, unsplash_key))
            if pexels_key:
                search_tasks.append(_search_pexels(session, query, pexels_key))
            if pixabay_key:
                search_tasks.append(_search_pixabay(session, query, pixabay_key))

            search_results = await asyncio.gather(*search_tasks)
            all_images = [image for sublist in search_results for image in sublist]

            # Filter images by target sizes and organize by platform
            filtered_images = []
            for url, width, height in all_images:
                for platform, size in TARGET_SIZE.items():
                    if (width, height) == size:
                        filtered_images.append((url, platform))
                        break

            # Download images with concurrency control
            semaphore = asyncio.Semaphore(max_concurrent_downloads)
            download_tasks = [
                _download_image(session, url, download_folder, platform, semaphore)
                for url, platform in filtered_images
            ]
            await asyncio.gather(*download_tasks)

    except Exception as e:
        logging.error(f"Critical operation failed: {str(e)}")
        raise ImageDownloaderError(f"Image download operation failed: {str(e)}") from e

async def _search_unsplash(session: aiohttp.ClientSession, query: str, api_key: str) -> List[Tuple[str, int, int]]:
    """Search Unsplash API for original size images"""
    try:
        url = "https://api.unsplash.com/search/photos"
        params = {"query": query, "per_page": 30, "client_id": api_key}

        async with session.get(url, params=params) as response:
            response.raise_for_status()
            data = await response.json()
            return [
                (item["urls"]["raw"], item["width"], item["height"])
                for item in data["results"]
            ]

    except aiohttp.ClientError as e:
        logging.warning(f"Unsplash API request failed: {str(e)}")
        return []
    except KeyError as e:
        logging.warning(f"Unexpected response format from Unsplash API: {str(e)}")
        return []

async def _search_pexels(session: aiohttp.ClientSession, query: str, api_key: str) -> List[Tuple[str, int, int]]:
    """Search Pexels API for original size images"""
    try:
        url = "https://api.pexels.com/v1/search"
        headers = {"Authorization": api_key}
        params = {"query": query, "per_page": 30}

        async with session.get(url, headers=headers, params=params) as response:
            response.raise_for_status()
            data = await response.json()
            return [
                (photo["src"]["original"], photo["width"], photo["height"])
                for photo in data.get("photos", [])
            ]

    except aiohttp.ClientError as e:
        logging.warning(f"Pexels API request failed: {str(e)}")
        return []
    except KeyError as e:
        logging.warning(f"Unexpected response format from Pexels API: {str(e)}")
        return []

async def _search_pixabay(session: aiohttp.ClientSession, query: str, api_key: str) -> List[Tuple[str, int, int]]:
    """Search Pixabay API for original size images"""
    try:
        url = "https://pixabay.com/api/"
        params = {
            "key": api_key,
            "q": query,
            "per_page": 30,
            "image_type": "photo"
        }

        async with session.get(url, params=params) as response:
            response.raise_for_status()
            data = await response.json()
            return [
                (item["webformatURL"], item["imageWidth"], item["imageHeight"])
                for item in data.get("hits", [])
            ]

    except aiohttp.ClientError as e:
        logging.warning(f"Pixabay API request failed: {str(e)}")
        return []
    except KeyError as e:
        logging.warning(f"Unexpected response format from Pixabay API: {str(e)}")
        return []

async def _download_image(
    session: aiohttp.ClientSession,
    url: str,
    base_folder: Path,
    platform: str,
    semaphore: asyncio.Semaphore
) -> None:
    """Download and save an image to platform-specific folder"""
    async with semaphore:
        try:
            platform_folder = base_folder / platform
            platform_folder.mkdir(parents=True, exist_ok=True)
            file_name = platform_folder / f"{uuid.uuid4().hex}.jpg"

            async with session.get(url) as response:
                response.raise_for_status()
                content = await response.read()

                # Save file with platform-specific naming
                loop = asyncio.get_running_loop()
                await loop.run_in_executor(
                    None,
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
                query="landscape",
                download_folder=Path("social_media_images"),
                unsplash_key="",
                pexels_key=PEXELS_API_KEY,
                pixabay_key=PIXABAY_API_KEY
            )
        except ImageDownloaderError as e:
            logging.error(f"Image download process failed: {str(e)}")

    asyncio.run(main())