from base import MediaItem
from moviepy import ImageClip, ColorClip
from PIL import Image
from typing import List, Any


class ImageMedia(MediaItem):
    def _load_sync(self):
        print("Step 2: Loading image from", self.file_path)
        return Image.open(self.file_path)

    def apply_effects(self, effects: List[Any]):
        image = self._load_sync()
        for effect in effects:
            image = effect.apply(image)
        return image
