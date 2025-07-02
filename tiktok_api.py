# not tested yet

import aiohttp
import asyncio
import time
import logging
from typing import List, Optional

class TikTokAsyncUploader:
    AUTH_BASE_URL = "https://open-api.tiktok.com/platform/oauth/connect/"
    TOKEN_URL = "https://open-api.tiktok.com/oauth/access_token/"
    VIDEO_UPLOAD_URL = "https://open-api.tiktok.com/share/video/upload/"
    VIDEO_PUBLISH_URL = "https://open-api.tiktok.com/share/video/publish/"

    def __init__(self, client_key, client_secret, redirect_uri, access_token=None, refresh_token=None):
        self.client_key = client_key
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri
        self.access_token = access_token
        self.refresh_token = refresh_token

    def get_authorization_url(self, scopes: List[str]) -> str:
        """
        Generate the TikTok OAuth2 authorization URL for user login.
        """
        scope_str = " ".join(scopes)
        url = (
            f"{self.AUTH_BASE_URL}"
            f"?client_key={self.client_key}"
            f"&response_type=code"
            f"&scope={scope_str}"
            f"&redirect_uri={self.redirect_uri}"
            f"&state={int(time.time())}"
        )
        return url

    async def fetch_access_token(self, code: str, session: aiohttp.ClientSession):
        """
        Exchange authorization code for access and refresh tokens.
        """
        data = {
            "client_key": self.client_key,
            "client_secret": self.client_secret,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": self.redirect_uri,
        }
        async with session.post(self.TOKEN_URL, data=data) as resp:
            resp.raise_for_status()
            tokens = await resp.json()
            self.access_token = tokens["data"]["access_token"]
            self.refresh_token = tokens["data"]["refresh_token"]
            return tokens

    async def refresh_access_token(self, session: aiohttp.ClientSession):
        """
        Refresh the access token using the refresh token.
        """
        data = {
            "client_key": self.client_key,
            "client_secret": self.client_secret,
            "grant_type": "refresh_token",
            "refresh_token": self.refresh_token,
        }
        async with session.post(self.TOKEN_URL, data=data) as resp:
            resp.raise_for_status()
            tokens = await resp.json()
            self.access_token = tokens["data"]["access_token"]
            self.refresh_token = tokens["data"]["refresh_token"]
            return tokens

    async def upload_video(self, video_path: str, session: aiohttp.ClientSession) -> str:
        """
        Upload a video file to TikTok (step 1 of 2).
        Returns the video_id for publishing.
        """
        headers = {
            "Authorization": f"Bearer {self.access_token}"
        }
        with open(video_path, "rb") as f:
            data = aiohttp.FormData()
            data.add_field('video', f, filename=video_path, content_type='video/mp4')
            async with session.post(self.VIDEO_UPLOAD_URL, headers=headers, data=data) as resp:
                resp.raise_for_status()
                result = await resp.json()
                video_id = result["data"]["video_id"]
                return video_id

    async def publish_video(self, video_id: str, session: aiohttp.ClientSession, description: str = "") -> dict:
        """
        Publish the uploaded video to TikTok (step 2 of 2).
        """
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        data = {
            "video_id": video_id,
            "text": description
        }
        async with session.post(self.VIDEO_PUBLISH_URL, headers=headers, json=data) as resp:
            resp.raise_for_status()
            return await resp.json()

    async def upload_and_publish(self, video_path: str, description: str = "", session: Optional[aiohttp.ClientSession] = None) -> dict:
        """
        Complete workflow: upload and publish a video with description.
        """
        close_session = False
        if session is None:
            session = aiohttp.ClientSession()
            close_session = True
        try:
            video_id = await self.upload_video(video_path, session)
            result = await self.publish_video(video_id, session, description)
            return result
        except Exception as e:
            logging.error(f"TikTok upload failed: {e}")
            raise
        finally:
            if close_session:
                await session.close()

# Example usage (fill in your credentials and handle OAuth2 flow as needed):
# async def main():
#     uploader = TikTokAsyncUploader(client_key, client_secret, redirect_uri)
#     print("Go to this URL and authorize:", uploader.get_authorization_url(["video.upload", "video.publish"]))
#     code = input("Paste the code from the redirect URL: ")
#     async with aiohttp.ClientSession() as session:
#         await uploader.fetch_access_token(code, session)
#         await uploader.upload_and_publish("/path/to/video.mp4", "My awesome video!", session)
#
# asyncio.run(main())