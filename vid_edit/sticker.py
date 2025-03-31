from base import MediaItem
from moviepy import ImageClip
from PIL import Image
from typing import List, Any


class StickerMedia(MediaItem):
    def _load_sync(self):
        print("Step 5: Loading sticker image from", self.file_path)
        return Image.open(self.file_path)

    def apply_effects(self, effects: List[Any]):
        sticker = self._load_sync()
        for effect in effects:
            sticker = effect.apply(sticker)
        return sticker
