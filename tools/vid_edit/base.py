from pathlib import Path
import asyncio
from typing import Any, List

# Base Media Class


class MediaItem:
    def __init__(self, file_path: Path):
        self.file_path = file_path

    async def load(self) -> Any:
        # Asynchronously load the media (I/O-bound)
        return await asyncio.to_thread(self._load_sync)

    def _load_sync(self):
        raise NotImplementedError("Must be implemented in subclass.")

    def apply_effects(self, effects: List[Any]) -> Any:
        raise NotImplementedError(
            "Subclasses must implement effect processing.")

# Base class for Effects (e.g., Zoom)


class BaseEffect:
    def apply(self, media):
        raise NotImplementedError("Effect must implement apply() method.")
