from base import MediaItem
from moviepy import AudioFileClip
from typing import List, Any


class AudioMedia(MediaItem):

    def _load_sync(self):
        print("Step 3: Loading audio from", self.file_path)
        return AudioFileClip(str(self.file_path))

    def apply_effects(self, effects: List[Any]):
        audio = self._load_sync()
        for effect in effects:
            audio = effect.apply(audio)
        return audio
