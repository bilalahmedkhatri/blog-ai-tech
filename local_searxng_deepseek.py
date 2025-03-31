from hashlib import file_digest
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from urllib.parse import urlparse
from typing import Dict, List
from PIL import Image
from db import *
import asyncio
import ssl
import aiohttp
import uuid
import os

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

async def search_searxng(
    query: str,
    categories: str = 'images',
    language: str = 'de-DE'
) -> Dict[int, dict]:
    """Search SearXNG instance and return image results with positions"""
    url = "http://localhost:8888/search"
    params = {
        "q": query,
        "format": "json",
        "categories": categories,
        "safe_search": "moderate",
        "language": language,
    }

    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(url, params=params) as response:
                results = await response.json()
                return {
                    result['positions'][0]: {
                        'title': result.get('title', ''),
                        'website_url': result.get('url', ''),
                        'img_src': result.get('img_src', ''),
                        'resolution': result.get('resolution', '')
                    }
                    for result in results.get('results', [])
                    if result.get('img_src')
                }
        except (aiohttp.ClientError, ValueError) as e:
            print(f"Error searching SearXNG: {str(e)}")
            pass
        
def deleta_metadata(image_path: str) -> None:
    """Remove metadata from an image file"""
    try:
        with Image.open(image_path) as img:
            data = list(img.getdata())
            img_without_metadata = Image.new(img.mode, img.size)
            img_without_metadata.putdata(data)
            img_without_metadata.save(image_path)
        print(f"Metadata removed from {image_path}")
    except Exception as e:
        print(f"Failed to remove metadata from {image_path}: {e}")
    
async def download_image(session: aiohttp.ClientSession, url: str, username: str, position: int) -> str:
    """Download and save a single image with async handling"""
    image_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.gif')
    if not any(url.endswith(ext) for ext in image_extensions):
        url += '.jpg'
        # deleta_metadata(url)
    try:
        parsed_url = urlparse(url)
        if not all([parsed_url.scheme, parsed_url.netloc]):
            raise ValueError("Invalid URL format")

        # Create user directory if not exists
        download_dir = os.path.join("download", username)
        os.makedirs(download_dir, exist_ok=True)

        # Generate filename from position and URL
        filename = f"{position}_{os.path.basename(parsed_url.path)}" or f"image_{position}.jpg"
        filepath = os.path.join(download_dir, filename)

        async with session.get(url) as response:
            if response.status != 200:
                raise ValueError(f"HTTP Error {response.status}")
            
            # Verify content type is image
            content_type = response.headers.get('Content-Type', '')
            if not content_type.startswith('image/'):
                raise ValueError(f"Non-image content type: {content_type}")

            # Stream content to file
            with open(filepath, 'wb') as f:
                async for chunk in response.content.iter_chunked(1024 * 16):
                    f.write(chunk)

            deleta_metadata(filepath)
            
            # return f"Downloaded {url} to {filepath}"
            return filepath

    except Exception as e:
        return f"Error: {url} - {str(e)}"

def store_data(results: Dict[int, dict], username: str):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.name == username).first()
        if not user:
            new_user = User(
                id=uuid.uuid4().int,
                # id=str(uuid.uuid4()),
                name=username,
                email=None,
                hashed_password='',
                permissions=''
            )
            
            try:
                db.add(new_user)
                db.commit()
            except IntegrityError as e:
                db.rollback()
                print(f"Integrity Error: {str(e)}")
                return
        
        for position, result in results.items():
            db_image = ImageDetail(
                id=str(uuid.uuid4()),
                title=result['title'],
                author_id=username,
                image_url=result['img_src'],
                resolution=result['resolution'],
                site_url=result['website_url']
            )
            db.add(db_image)
        db.commit()
        
    except SQLAlchemyError as e:
        print('SQLAlchemy error: ', e)
        db.rollback()
    finally:
        db.close()

async def process_images(results: Dict[int, dict], username: str) -> List[str]:
    """Process all images in parallel"""
    async with aiohttp.ClientSession() as session:
        tasks = [
            download_image(session, result['img_src'], username, position)
            for position, result in results.items()
            if result.get('img_src')
        ]
        file_paths = await asyncio.gather(*tasks)
        
        store_data(results, username)
        return file_paths

async def main():
    query = "honda sports bike vertical images"
    username = "honda_v"
    
    # Perform search
    search_results = await search_searxng(query)
    
    if not search_results:
        print("No images found")
        return

    # Download images
    print(f"Found {len(search_results)} images, downloading...")
    await process_images(search_results, username)
    
if __name__ == "__main__":
    with asyncio.Runner() as runner:
        runner.run(main())