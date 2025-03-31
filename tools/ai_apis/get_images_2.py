import asyncio
import aiohttp
import logging
import uuid
import hashlib
from pathlib import Path
from typing import List, Optional, Dict, Set
from PIL import Image
import io, os

from dotenv import load_dotenv

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
    "youtube_short": (1920, 1080),
    "instagram_feed": (1080, 1080),
    "instagram_story": (1080, 1920),
    "facebook_reel": (1200, 630)
}

class ImageDownloaderError(Exception):
    """Base class for image downloader exceptions"""
    pass

class APIError(ImageDownloaderError):
    """Exception raised for API communication failures"""
    pass

async def search_and_download_images(
    query: str,
    per_api_count: int = 5,
    download_folder: Path = Path("downloaded_images"),
    unsplash_key: Optional[str] = None,
    pexels_key: Optional[str] = None,
    pixabay_key: Optional[str] = None,
    max_concurrent_downloads: int = 10,
    exact_match: bool = False,
    target_platforms: List[str] = None,
    similarity_threshold: float = 0.95
) -> None:
    """
    Enhanced image downloader with platform-specific sizing and duplicate prevention.

    Args:
        query: Search term for images
        exact_match: Try to find exact match for search terms
        target_platforms: List of platforms to resize images for
        similarity_threshold: Minimum hash similarity to consider duplicates (0-1)
    """
    try:
        download_folder.mkdir(parents=True, exist_ok=True)
        target_platforms = target_platforms or []
        
        # Load existing hashes
        hash_file = download_folder / "downloaded_hashes.txt"
        existing_hashes = await _load_existing_hashes(hash_file)

        async with aiohttp.ClientSession() as session:
            # Search parameters with exact match handling
            search_params = {
                "exact_match": exact_match,
                "orientation": "landscape" if exact_match else None
            }

            # Gather image URLs from APIs
            search_tasks = []
            if unsplash_key:
                search_tasks.append(_search_unsplash(session, query, per_api_count, unsplash_key, **search_params))
            if pexels_key:
                search_tasks.append(_search_pexels(session, query, per_api_count, pexels_key, **search_params))
            if pixabay_key:
                search_tasks.append(_search_pixabay(session, query, per_api_count, pixabay_key, **search_params))

            search_results = await asyncio.gather(*search_tasks)
            all_urls = list(set([url for sublist in search_results for url in sublist]))

            # Download images with advanced checks
            semaphore = asyncio.Semaphore(max_concurrent_downloads)
            download_tasks = [
                _download_image(
                    session, url, download_folder, semaphore,
                    existing_hashes, hash_file, target_platforms,
                    similarity_threshold
                )
                for url in all_urls
            ]
            await asyncio.gather(*download_tasks)

    except Exception as e:
        logging.error(f"Critical operation failed: {str(e)}")
        raise ImageDownloaderError(f"Image download operation failed: {str(e)}") from e

async def _search_unsplash(session: aiohttp.ClientSession, query: str, count: int, 
                         api_key: str, exact_match: bool, **kwargs) -> List[str]:
    """Search Unsplash API with exact match handling"""
    try:
        processed_query = f'"{query}"' if exact_match else query
        url = "https://api.unsplash.com/search/photos"
        params = {
            "query": processed_query,
            "per_page": count,
            "client_id": api_key,
            "orientation": kwargs.get("orientation")
        }

        async with session.get(url, params=params) as response:
            response.raise_for_status()
            data = await response.json()
            return [item["urls"]["regular"] for item in data["results"]]

    except aiohttp.ClientError as e:
        logging.warning(f"Unsplash API request failed: {str(e)}")
        return []

async def _search_pexels(session: aiohttp.ClientSession, query: str, count: int,
                       api_key: str, exact_match: bool, **kwargs) -> List[str]:
    """Search Pexels API with exact match handling"""
    try:
        processed_query = f'"{query}"' if exact_match else query
        url = "https://api.pexels.com/v1/search"
        headers = {"Authorization": api_key}
        params = {
            "query": processed_query,
            "per_page": count,
            "orientation": kwargs.get("orientation")
        }

        async with session.get(url, headers=headers, params=params) as response:
            response.raise_for_status()
            data = await response.json()
            return [photo["src"]["original"] for photo in data.get("photos", [])]

    except aiohttp.ClientError as e:
        logging.warning(f"Pexels API request failed: {str(e)}")
        return []

async def _search_pixabay(session: aiohttp.ClientSession, query: str, count: int,
                        api_key: str, exact_match: bool, **kwargs) -> List[str]:
    """Search Pixabay API with exact match handling"""
    try:
        processed_query = f'"{query}"' if exact_match else query
        url = "https://pixabay.com/api/"
        params = {
            "key": api_key,
            "q": processed_query,
            "per_page": count,
            "image_type": "photo",
            "orientation": kwargs.get("orientation")
        }

        async with session.get(url, params=params) as response:
            response.raise_for_status()
            data = await response.json()
            return [item["webformatURL"] for item in data.get("hits", [])]

    except aiohttp.ClientError as e:
        logging.warning(f"Pixabay API request failed: {str(e)}")
        return []

async def _download_image(session: aiohttp.ClientSession, url: str, download_folder: Path,
                        semaphore: asyncio.Semaphore, existing_hashes: Set[str],
                        hash_file: Path, target_platforms: List[str],
                        similarity_threshold: float) -> None:
    """Enhanced download handler with duplicate checking and resizing"""
    async with semaphore:
        try:
            async with session.get(url) as response:
                response.raise_for_status()
                content = await response.read()
                
                # Calculate perceptual hash
                image_hash = await _calculate_phash(content)
                
                # Check for similar hashes
                if any(_hash_similarity(image_hash, existing_hash) >= similarity_threshold
                      for existing_hash in existing_hashes):
                    logging.info(f"Skipping duplicate image: {url}")
                    return

                # Save original image
                file_name = download_folder / f"{uuid.uuid4().hex}.jpg"
                loop = asyncio.get_running_loop()
                await loop.run_in_executor(None, lambda: file_name.write_bytes(content))
                
                # Add hash to existing set and save
                existing_hashes.add(image_hash)
                await _save_hash(hash_file, image_hash)

                # Process platform-specific sizes
                await _process_platform_sizes(content, download_folder, target_platforms)

                logging.info(f"Successfully processed: {file_name}")

        except Exception as e:
            logging.warning(f"Error processing {url}: {str(e)}")

async def _calculate_phash(content: bytes) -> str:
    """Calculate perceptual hash for duplicate detection"""
    def _phash():
        try:
            image = Image.open(io.BytesIO(content))
            image = image.convert("L").resize((32, 32), Image.LANCZOS)
            pixels = list(image.getdata())
            avg = sum(pixels) / len(pixels)
            return ''.join(['1' if pixel > avg else '0' for pixel in pixels])
        except Exception as e:
            logging.warning(f"Hash calculation failed: {str(e)}")
            return ""
    
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(None, _phash)

def _hash_similarity(hash1: str, hash2: str) -> float:
    """Calculate similarity between two hashes"""
    if len(hash1) != len(hash2) or not hash1:
        return 0.0
    return sum(1 for a, b in zip(hash1, hash2) if a == b) / len(hash1)

async def _process_platform_sizes(content: bytes, base_folder: Path, platforms: List[str]) -> None:
    """Resize image for target platforms"""
    def _resize():
        try:
            original_image = Image.open(io.BytesIO(content))
            for platform in platforms:
                size = TARGET_SIZE.get(platform)
                if not size:
                    continue
                
                # Create platform folder
                platform_folder = base_folder / platform
                platform_folder.mkdir(exist_ok=True)
                
                # Resize and save
                resized = original_image.resize(size, Image.LANCZOS)
                resized_path = platform_folder / f"{uuid.uuid4().hex}.jpg"
                resized.save(resized_path, "JPEG", quality=85)
        except Exception as e:
            logging.warning(f"Resizing failed: {str(e)}")
    
    if platforms:
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(None, _resize)

async def _load_existing_hashes(hash_file: Path) -> Set[str]:
    """Load existing hashes from file"""
    try:
        if hash_file.exists():
            return set(hash_file.read_text().splitlines())
        return set()
    except Exception as e:
        logging.warning(f"Hash loading failed: {str(e)}")
        return set()

async def _save_hash(hash_file: Path, image_hash: str) -> None:
    """Append new hash to file"""
    try:
        with open(hash_file, 'a') as f:
            f.write(f"{image_hash}\n")
    except Exception as e:
        logging.warning(f"Hash saving failed: {str(e)}")

# Example usage
if __name__ == "__main__":
    async def main():
        try:
            await search_and_download_images(
                query="mountain landscape",
                exact_match=True,
                per_api_count=3,
                download_folder=Path("nature_images"),
                target_platforms=["youtube_short", "instagram_feed"],
                unsplash_key="",
                pexels_key=PEXELS_API_KEY,
                pixabay_key=PIXABAY_API_KEY
            )
        except ImageDownloaderError as e:
            logging.error(f"Image download process failed: {str(e)}")

    asyncio.run(main())