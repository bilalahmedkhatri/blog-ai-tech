import os
import re
import requests
import logging
from concurrent.futures import ThreadPoolExecutor
import concurrent
from urllib.parse import quote_plus
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def download_google_images(query, num_images=10, output_dir='downloads', size='medium', max_workers=5):
    """
    Asynchronously downloads images from Google Images search results
    
    Args:
        query (str): Search query term
        num_images (int): Number of images to download (default: 10)
        output_dir (str): Output directory path (default: 'downloads')
        size (str): Image size filter: 'large', 'medium', 'icon' (default: 'medium')
        max_workers (int): Maximum parallel threads (default: 5)
    """
    try:
        # Validate parameters
        if not query or not isinstance(query, str):
            raise ValueError("Invalid search query")
        
        os.makedirs(output_dir, exist_ok=True)
        
        # Get image URLs from Google search
        image_urls = _fetch_image_urls(query, num_images, size)
        logger.info(f"Found {len(image_urls)} potential image URLs")
        
        # Create thread pool for parallel downloads
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = []
            for idx, img_url in enumerate(image_urls[:num_images]):
                save_path = os.path.join(output_dir, f"image_{idx+1}.jpg")
                futures.append(executor.submit(_download_single_image, img_url, save_path))
            
            for future in concurrent.futures.as_completed(futures):
                try:
                    result = future.result()
                except Exception as e:
                    logger.error(f"Download failed: {str(e)}")

    except Exception as e:
        logger.error(f"Critical error in main execution: {str(e)}")
        raise

def _fetch_image_urls(query, num_images, size):
    """Fetch image URLs from Google search results"""
    try:
        size_codes = {
            'large': 'isz:l',
            'medium': 'isz:m',
            'icon': 'isz:i'
        }
        
        search_url = f"https://www.google.com/search?tbm=isch&q={quote_plus(query)}"
        if size in size_codes:
            search_url += f"&tbs={size_codes[size]}"
        
        response = requests.get(search_url, headers=HEADERS)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        script_tags = soup.find_all('script')
        
        image_urls = []
        pattern = re.compile(r'\[\"(http[s]?://.*?)\",\d+,\d+\]')
        
        for script in script_tags:
            if 'AF_initDataCallback' in script.text:
                matches = pattern.findall(script.text)
                image_urls.extend([match for match in matches if _is_valid_image(match)])
        
        return list(set(image_urls))[:num_images*2]  # Return extra URLs to account for potential failures

    except requests.RequestException as e:
        logger.error(f"Network error during search: {str(e)}")
        return []
    except Exception as e:
        logger.error(f"Error parsing search results: {str(e)}")
        return []

def _download_single_image(url, save_path):
    """Download and save a single image with error handling"""
    try:
        response = requests.get(url, headers=HEADERS, stream=True, timeout=10)
        response.raise_for_status()
        
        # Verify image content
        content_type = response.headers.get('Content-Type', '')
        if 'image' not in content_type:
            raise ValueError(f"Invalid content type: {content_type}")
        
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(8192):
                f.write(chunk)
        logger.info(f"Successfully downloaded: {save_path}")
        return True

    except requests.RequestException as e:
        logger.warning(f"Failed to download {url}: {str(e)}")
        return False
    except Exception as e:
        logger.warning(f"Error processing {url}: {str(e)}")
        return False

def _is_valid_image(url):
    """Validate image URL format"""
    return any(url.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp'])

# Usage
download_google_images(
    query="sunset",
    num_images=15,
    output_dir="sunset_images",
    size="large",
    max_workers=8
)