from base import MediaItem
from typing import List, Any


class TextMedia(MediaItem):
    def __init__(self, text: str):
        self.text = text

    async def load(self):
        print("Step 4: Loading text")
        return self.text

    def apply_effects(self, effects: List[Any]):
        text_result = self.text
        for effect in effects:
            text_result = effect.apply(text_result)
        return text_result
