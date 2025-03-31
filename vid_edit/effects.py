from base import BaseEffect
from PIL import Image
from moviepy import VideoClip


class ZoomInEffect(BaseEffect):
    def __init__(self, zoom_ratio: float):
        self.zoom_ratio = zoom_ratio

    def apply(self, image: Image.Image) -> Image.Image:
        print("Step 6: Applying Zoom In Effect")
        base_size = image.size
        # Compute new size and apply a simple zoom by resizing and then cropping the center.
        new_size = (
            int(base_size[0] * (1 + self.zoom_ratio)),
            int(base_size[1] * (1 + self.zoom_ratio))
        )
        image = image.resize(new_size, Image.LANCZOS)
        left = (new_size[0] - base_size[0]) // 2
        upper = (new_size[1] - base_size[1]) // 2
        return image.crop((left, upper, left + base_size[0], upper + base_size[1]))


class SideLeftTransition(BaseEffect):
    def apply(self, clip: VideoClip) -> VideoClip:
        print("Step 8: Applying Side Left Transition")
        # For demonstration, using moviepy's crossfade for a dummy transition effect.
        return clip.crossfadein(1).crossfadeout(1)


class SideLeftTransition(BaseEffect):
    def apply(self, media):
        print("Applying side left transition")
        return media
