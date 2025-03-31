from typing import Optional, List, Any
from video_composer import VideoComposer
from media_file import ImageMedia
from audio import AudioMedia
from pathlib import Path
import random
import string
from tools.utils import FileDirectory


def process_video_task(image_paths: List[str], audio_path: Optional[str] = None, output_filename: str = ""):
    print("Step 1: Starting video processing pipeline")

    # Create media items for images and audio.
    image_items = [ImageMedia(Path(p)) for p in image_paths]
    audio_item = AudioMedia(Path(audio_path)) if audio_path else None

    # Initialize the video composer with media items.
    composer = VideoComposer(image_items, audio_item)
    if not output_filename:
        random_name = ''.join(random.choices(string.ascii_lowercase, k=3))
        output_filename = f"output_{random_name}.mp4"

    # Compose and export the final video.
    composer.export_video(output_filename)
    print("Step 13: Video processing completed, output file:", output_filename)
    return output_filename

# ----------------------- #
# Standalone Testing (if not using Celery)
# ----------------------- #


if __name__ == "__main__":
    BASE_DIR = Path(__file__).resolve().parent.parent
    file_dir = FileDirectory()
    images = file_dir.get_image_files(str(BASE_DIR.joinpath('media', 'faces')), load_clips=False)
    audio = file_dir.get_audio_files(str(BASE_DIR.joinpath('media', 'audio')), load_clips=False)
    str_audio = ''.join(audio)
    process_video_task(images, str_audio, "test_output.mp4")
