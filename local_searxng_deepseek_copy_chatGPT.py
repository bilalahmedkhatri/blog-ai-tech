import os
import asyncio
import aiohttp
import logging
from PIL import Image
from sqlmodel import Session, select
from urllib.parse import urlparse
from db import engine, User, ImageDetail

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

language_country_codes = [
    "en-US",   # English (United States)
    "en-GB",   # English (United Kingdom)
    "es-ES",   # Spanish (Spain)
    "es-MX",   # Spanish (Mexico)
]

class ImageProcessor:
    def __init__(self, username: int):
        self.username = username
        self.download_dir = os.path.join("download", str(self.username))
        os.makedirs(self.download_dir, exist_ok=True)
        logger.info(f"Initialized ImageProcessor for user: {self.username}")

    async def search_images(self, q_params: dict) -> dict:
        """Search for images using the SearXNG instance."""
        url = "http://localhost:8888/search"
        params = {
            "q": q_params.get("query", ""),
            "format": "json",
            "categories": q_params.get("categories", "images"),
            "safe_search": "moderate",
            "lang": q_params.get("language", "en-EN"),
            "page": q_params.get("page", 1),
        }

        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(url, params=params) as response:
                    results = await response.json()
                    image_results = {
                        result['positions'][0]: {
                            'title': result.get('title', ''),
                            'website_url': result.get('url', ''),
                            'img_src': result.get('img_src', ''),
                            'resolution': result.get('resolution', '')
                        }
                        for result in results.get('results', [])
                        if result.get('img_src')
                    }
                    logger.info(
                        f"Found {len(image_results)} images for query: '{q_params['query']}'")
                    return image_results
            except (aiohttp.ClientError, ValueError) as e:
                logger.error(f"Error searching SearXNG: {str(e)}")
                return {}

    async def download_image(self, session: aiohttp.ClientSession, data: dict, position: int) -> str:
        """Download and save a single image asynchronously."""
        image_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.gif')
        url = str(data['img_src'])
        if not any(url.endswith(ext) for ext in image_extensions):
            url += '.jpg'

        try:
            parsed_url = urlparse(url)
            if not all([parsed_url.scheme, parsed_url.netloc]):
                raise ValueError("Invalid URL format")

            filename = f"{position}_{os.path.basename(parsed_url.path)}" or f"image_{position}.jpg"
            filepath = os.path.join(self.download_dir, filename)

            async with session.get(url) as response:
                if response.status != 200:
                    raise ValueError(f"HTTP Error {response.status}")

                content_type = response.headers.get('Content-Type', '')
                if not content_type.startswith('image/'):
                    raise ValueError(f"Non-image content type: {content_type}")

                with open(filepath, 'wb') as f:
                    async for chunk in response.content.iter_chunked(1024 * 16):
                        f.write(chunk)
                    self.store_data(data, url)

            self.remove_metadata(filepath)
            # logger.info(f"Downloaded and processed image: {filepath}")
            return filepath

        except Exception as e:
            logger.error(f"Error-downloading {url}: {str(e)}")
            return ""

    def remove_metadata(self, image_path: str) -> None:
        """Remove metadata from the image."""
        try:
            with Image.open(image_path) as img:
                data = list(img.getdata())
                rm_metadata = Image.new(img.mode, img.size)
                rm_metadata.putdata(data)
                rm_metadata.save(image_path)
        except Exception as e:
            logger.error(
                f"Error removing metadata from {image_path}: {str(e)}")

    def store_data(self, results: dict, url: str) -> None:
        db_image = ImageDetail(
            title=results['title'],
            author_id=self.username,
            image_url=url,
            resolution=results['resolution'],
            site_url=results['website_url']
        )
        with Session(engine) as session:
            session.add(db_image)
            session.commit()
                

    def store_data_update(self, total_images: int) -> None:
        with Session(engine) as session:
            statement = select(User).where(User.id == self.username)
            results = session.exec(statement)
            user = results.one()
            total = user.num_img + total_images
            user.num_img = total
            session.add(user)
            session.commit()
            session.refresh(user)


    async def process_images(self, params: dict, username: int) -> None:
        """Search, download, and store images based on the query."""
        results = await self.search_images(params)
        print('total images', len(results))
        if not results:
            logger.info("No images found")
            return

        async with aiohttp.ClientSession() as session:
            tasks = [
                self.download_image(session, result, position)
                for position, result in results.items()
                if result.get('img_src')
            ]
            file_paths = await asyncio.gather(*tasks)
        self.store_data_update(len(file_paths))


# Example usage
# if __name__ == "__main__":
#     rand_lang = random.choice(language_country_codes)
#     rend_page = random.randint(1, 50)
#     params = {
#         "query": "honda cbr 650 rr",
#         "categories": "images",
#         "limit": 100,
#         "size": "large",
#         "page": rend_page,
#         "orientation": "vertical",
#         # Optional languages are: "en-EN", "de-DE", "es-ES", "fr-FR", "it-IT", "pt-PT"
#         "language": rand_lang
#     }
#     username = 1

#     processor = ImageProcessor(username)
#     asyncio.run(processor.process_images(params, username))
