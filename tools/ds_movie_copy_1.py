from PIL import Image
from moviepy import *
from moviepy.video.fx import CrossFadeIn, CrossFadeOut
from moviepy.audio.io.AudioFileClip import AudioFileClip
from tools.utils import FileDirectory
from pathlib import Path
import random
import math
from typing import Optional
import numpy
import string
from db import User, ImageDetail, engine
from sqlmodel import Session, select


BASE_DIR = Path(__file__).resolve().parent
file_directory = FileDirectory()

"""
Jo naam likhe howe hain un changes ker ke different result le skte hain

FILE_NAME = default "", Agr file name dena hy, warna random name le lega 

FPS = default 29, fps ko apne mutabiq kam ziyada ker skte ho, jitne FPS ziyada hoghe utna build hone m ziyda time laghega.

CURRENT_SIZE = TARGET_SIZE[" YAHA PE TARGET_SIZE M SAY KOI BHI SIZE DE SKTE HO"]
EXAMPLE: CURRENT_SIZE = TARGET_SIZE["youtube_short"]

IMAGE_VIEW_DURATION = default 5 yaha pe koi bhi number (duration ek image view ki) de skte ho agar 3 se 7 seconds tak to beter hoga likn effects ko bhi manage kerna parega
ab agar 60 seconds tk ki video banani 0r 12 images hain 5 * 12 = 60, matlab IMAGE_VIEW_DURATION = 5 seconds tak ka hoga

TRANSITION_DURATION = default 1, jb image change hoti hay to jo effect aata hay ye us effect ka time hay abhi 1 second thik agar or bhi effect changing ke wakt ko barana chate ho to sirf 2 seond ker dena. agar es s ziyada kro go total duration p acha khasa farak pare ga.

ZOOM_RATIO = default 0.05, agar zoom effect lagana hay to 0.01 se uper koi bhi value or ZOOM_APPROVE ko True ker do ghe to zoom laghe ga 0.00 rakha to zoom apply nahi or ye sirf abhi zoom-in krega 0.01 se 0.09 tak ker skte ho likn ziyada hoga utna kareeb say zoom krega, ho skta result etna acha naa aae.

FACE_OVERLAY_CONFORM = default True, agar TRUE (capitalized likna) uper main kisi ka photo add ker skte ho.
"""

# Video configuration
FILE_NAME = ""
TARGET_SIZE = {
    "youtube_video": (1920, 1080),
    "youtube_short": (1080, 1920),
    "instagram_feed": (1080, 1080),
    "instagram_story": (1080, 1920),
    "facebook_short": (1200, 630)
}
CURRENT_SIZE = TARGET_SIZE["youtube_short"]
IMAGE_VIEW_DURATION = 5  # seconds per image
TRANSITION_DURATION = 1  # seconds between images
ZOOM_RATIO = 0.00  # zoom IN effect
FACE_OVERLAY_CONFORM = False
ZOOM_APPROVE = False

        
def calculate_total_duration(total_img):
    """Calculate video duration based on number of images and transitions"""
    return (total_img * IMAGE_VIEW_DURATION) - ((total_img - 1) * TRANSITION_DURATION)

def zoom_in_effect(clip, zoom_ratio=ZOOM_RATIO):
    def effect(get_frame, t):
        img = Image.fromarray(get_frame(t))
        base_size = img.size

        new_size = [
            math.ceil(img.size[0] * (1 + (zoom_ratio * t))),
            math.ceil(img.size[1] * (1 + (zoom_ratio * t)))
        ]

        # The new dimensions must be even.
        new_size[0] = new_size[0] + (new_size[0] % 2)
        new_size[1] = new_size[1] + (new_size[1] % 2)

        img = img.resize(new_size, Image.LANCZOS) # type: ignore

        x = math.ceil((new_size[0] - base_size[0]) / 2)
        y = math.ceil((new_size[1] - base_size[1]) / 2)

        img = img.crop([
            x, y, new_size[0] - x, new_size[1] - y
        ]).resize(base_size, Image.LANCZOS) # type: ignore

        result = numpy.array(img)
        img.close()

        return result

    return clip.transform(effect)

def fit_to_screen(clip):
    """Resize image to fill screen with aspect ratio preservation"""
    target_w, target_h = CURRENT_SIZE
    scale = max(target_w / clip.w, target_h / clip.h)
    print('scale', scale)
    # return clip.with_effects([vfx.Resize(scale)]).with_position('center')
    return clip.resized(scale).with_position('center')

def create_transition_clips(images):
    """Generate clips with proper transitions using MoviePy 2.x syntax"""
    clips = []
    for i, clip in enumerate(images):
        print(i, 'clip', type(clip), clip)
        # Process base clip
        if ZOOM_RATIO >= 0.01 and ZOOM_APPROVE:
            composite = CompositeVideoClip([
                ColorClip(
                    size=CURRENT_SIZE,
                    color=(0, 0, 0),
                    duration=IMAGE_VIEW_DURATION),
                fit_to_screen(clip.with_duration(IMAGE_VIEW_DURATION)),
                zoom_in_effect(clip)
            ]).with_start(i * (IMAGE_VIEW_DURATION - TRANSITION_DURATION))
            if i > 0:
                composite = composite.with_effects([
                    CrossFadeIn(TRANSITION_DURATION),
                    CrossFadeOut(TRANSITION_DURATION)
                ])
            clips.append(composite)
        else:
            composite = CompositeVideoClip([
                ColorClip(
                    size=CURRENT_SIZE,
                    color=(0, 0, 0),
                    duration=IMAGE_VIEW_DURATION),
                fit_to_screen(clip.with_duration(IMAGE_VIEW_DURATION))
            ]).with_start(i * (IMAGE_VIEW_DURATION - TRANSITION_DURATION))
            if i > 0:
                composite = composite.with_effects([
                    CrossFadeIn(TRANSITION_DURATION),
                    CrossFadeOut(TRANSITION_DURATION)
                ])
            clips.append(composite)
    
    return clips


def create_face_overlay(total_duration: int) -> Optional[VideoClip]:
    """Create animated face overlay with proper clip creation."""
    face_image_paths = file_directory.get_image_files(
        BASE_DIR.joinpath('media', 'faces'))
    if not face_image_paths:
        return None

    try:
        print('face overlay ', type(face_image_paths))
        random_face_image_path = random.choice(face_image_paths)
        print('wih randome face overlay ', type(face_image_paths))
        
        return (
            random_face_image_path
            .resized(height=400)
            .with_position(('right', 'bottom'))
            # .with_effects([CrossFadeIn(1), CrossFadeOut(1)])
            .with_duration(total_duration)
        )
    except Exception as e:
        print(f"Face overlay error: {e}")
        return None

def main():
    """Main processing function with proper resource handling"""
    clips = []
    
    try:
        # Load and process images
        image_paths = file_directory.get_image_files(BASE_DIR.joinpath('media', 'image'))
        if not image_paths:
            raise ValueError("No images found in media/image directory")
        
        
        # Process clips with transitions
        final_clips = create_transition_clips(image_paths)
        clips.extend(final_clips)
        
        # Create main video
        main_video = CompositeVideoClip(final_clips, size=CURRENT_SIZE)

        # Add face overlay
        face_clip = create_face_overlay(main_video.duration)
        if face_clip and FACE_OVERLAY_CONFORM:
            clips.append(face_clip)
            main_video = CompositeVideoClip([main_video, face_clip])

        # Add audio
        audio_paths = file_directory.get_audio_files(BASE_DIR.joinpath('media', 'audio'), load_clips=False)
        if audio_paths:
            audio_clip = AudioFileClip(random.choice(audio_paths)).with_duration(main_video.duration)
            clips.append(audio_clip)
            main_video = main_video.with_audio(audio_clip)

        # Export video
        random_name = ''.join(random.choices(string.ascii_lowercase, k=3))
        output_name = (f"output_{random_name}.mp4" if not FILE_NAME else FILE_NAME)
        main_video.write_videofile(
            output_name,
            fps=15,
            codec="libx264",
            preset='fast'
        )
        print(f"Successfully created {output_name}")

    finally:
        for clip in clips:
            try:
                if hasattr(clip, 'close'):
                    clip.close()
            except Exception as e:
                print(f"Error closing clip: {e}")

if __name__ == "__main__":
    main()