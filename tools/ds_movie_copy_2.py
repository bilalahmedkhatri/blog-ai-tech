from moviepy import *
from moviepy.video.fx import CrossFadeIn, CrossFadeOut, Resize
import numpy as np
from utils import FileDirectory
from pathlib import Path
from PIL import Image
import random
import math

BASE_DIR = Path(__file__).resolve().parent
file_directory = FileDirectory()

# Video configuration
TARGET_SIZE = {
    "youtube": (1920, 1080),
    "instagram_feed": (1080, 1080),
    "instagram_story": (1080, 1920),
    "facebook": (1200, 630)
}
CURRENT_SIZE = TARGET_SIZE["instagram_story"]
IMAGE_VIEW_DURATION = 5  # seconds per image
TRANSITION_DURATION = 1  # seconds between images
ZOOM_RATIO = 0.80  # 8% zoom effect

"""
NOTE ABOUT CODE STATUS
es sound pooori lenka aa raha hai, rendering perfect ho rahi hai
"""


def calculate_total_duration(image_count):
    """Calculate video duration based on number of images and transitions"""
    total_video_duration = (image_count * IMAGE_VIEW_DURATION) - \
        ((image_count - 1) * TRANSITION_DURATION)
    print(
        f"Total video duration: {total_video_duration} seconds and image count: {image_count}")
    return total_video_duration


def add_ken_burns_effect(clip, zoom_ratio):
    """Apply Ken Burns (zoom) effect to a clip"""
    def effect_func(get_frame, t):
        frame = get_frame(t)
        img = Image.fromarray(frame)
        base_size = img.size

        # Calculate zoom
        zoom_factor = 1 + (zoom_ratio * t / clip.duration)
        new_size = [
            math.ceil(img.size[0] * zoom_factor),
            math.ceil(img.size[1] * zoom_factor)
        ]

        # Ensure even dimensions
        new_size[0] = new_size[0] + (new_size[0] % 2)
        new_size[1] = new_size[1] + (new_size[1] % 2)
        # Resize and crop
        img = img.resize(new_size, Image.Resampling.LANCZOS)
        x = math.ceil((new_size[0] - base_size[0]) / 2)
        y = math.ceil((new_size[1] - base_size[1]) / 2)
        img = img.crop((
            x, y, x + base_size[0], y + base_size[1]
        )).resize(base_size, Image.Resampling.LANCZOS)

        result = np.array(img)
        img.close()
        return result

    return clip.transform(effect_func)


def add_transitions(clips):
    """Add crossfade transitions between clips"""
    if len(clips) <= 1:
        return clips

    final_clips = []

    for i, clip in enumerate(clips):
        print(f"Processing clip {i+1}/{len(clips)}")

        # Set start time for each clip
        start_time = i * (IMAGE_VIEW_DURATION - TRANSITION_DURATION)
        processed_clip = clip.with_start(
            start_time).with_duration(IMAGE_VIEW_DURATION)

        # Apply Ken Burns effect if enabled
        if ZOOM_RATIO >= 0.01:
            try:
                processed_clip = add_ken_burns_effect(
                    processed_clip, ZOOM_RATIO)
                print(f"Applied Ken Burns effect to clip {i+1}")
            except Exception as e:
                print(
                    f"Warning: Could not apply Ken Burns effect to clip {i+1}: {e}")

        # Apply crossfade transitions (skip first clip for fade in, skip last for fade out)
        effects = []
        if i > 0:  # Not the first clip
            effects.append(CrossFadeIn(TRANSITION_DURATION))
        if i < len(clips) - 1:  # Not the last clip
            effects.append(CrossFadeOut(TRANSITION_DURATION))

        if effects:
            try:
                processed_clip = processed_clip.with_effects(effects)
                print(f"Applied crossfade effects to clip {i+1}")
            except Exception as e:
                print(f"Warning: Could not apply crossfade to clip {i+1}: {e}")

        final_clips.append(processed_clip)

    return final_clips


def fit_to_screen(clip, min_zoom=1.0):
    """Resize image to fill screen with aspect ratio preservation, considering minimum zoom."""
    target_w, target_h = CURRENT_SIZE
    # Pre-scale by the minimum zoom factor
    scale = max(target_w / clip.w, target_h / clip.h) * min_zoom
    print('fit_to_screen scale:', scale)
    return clip.resized(scale).with_position('center')


def create_base_composite_clip(
    image_clip,
    duration,
    background_color=(0, 0, 0),
    overlays=None,
    size=CURRENT_SIZE
):
    """
    Create a base composite video clip with a background, the main image, and optional overlays.

    Args:
        image_clip (VideoClip): The main image or video clip, already processed (resized, effects applied).
        duration (float): Duration of the composite clip in seconds.
        background_color (tuple): RGB color for the background.
        overlays (list): List of additional clips (e.g., watermarks, face overlays) to add on top.
        size (tuple): Size of the video frame (width, height).

    Returns:
        CompositeVideoClip: The composed video clip.
    """

    # Ensure the main image is centered and has the correct duration
    main_image = image_clip.with_position('center').with_duration(duration)

    # Create the background color clip
    background = ColorClip(
        size=size, color=background_color, duration=duration)

    # Compose the list of layers: background, main image, then overlays
    layers = [background, main_image]
    if overlays:
        layers.extend(overlays)

    composite = CompositeVideoClip(layers, size=size).with_duration(duration)
    return composite

# def add_transitions(images):
#     """Create video clips with transitions and zoom effects"""
#     final_clips = []

#     for i, clip in enumerate(images):
#         # Process the image clip first
#         processed_clip = (
#             clip.with_duration(IMAGE_VIEW_DURATION)
#             # .with_effects(fit_to_screen)
#             .with_effects(add_ken_burns_effect(clip))
#         )

#         # Create base composite clip
#         base_clip = CompositeVideoClip([
#             ColorClip(
#                 size=CURRENT_SIZE,
#                 color=(0,0,0),
#                 duration=IMAGE_VIEW_DURATION
#             ),
#             processed_clip.with_position('center'),  # Use the processed clip here
#             fit_to_screen(clip.with_duration(IMAGE_VIEW_DURATION)),
#         ]).with_duration(IMAGE_VIEW_DURATION)

#         # Add transitions after first clip
#         if i > 0:
#             base_clip = base_clip.with_effects([
#                 CrossFadeIn(TRANSITION_DURATION),
#                 CrossFadeOut(TRANSITION_DURATION)
#             ])

#         start_time = i * (IMAGE_VIEW_DURATION - TRANSITION_DURATION)
#         final_clips.append(base_clip.with_start(start_time))

#     return final_clips


def add_face_overlay(total_duration):
    """Add animated face overlay with MoviePy 2.x syntax"""
    face_paths = file_directory.get_image_files(
        BASE_DIR.joinpath('media', 'faces'), load_clips=False)
    if not face_paths:
        return None

    try:
        return (
            ImageClip(random.choice(face_paths))
            .with_duration(total_duration)
            .with_effects(Resize(height=200))
            .with_position(('right', 'bottom'))
            .with_layer(2)
        )
    except Exception as e:
        print(f"Face overlay error: {e}")
        return None


def main():
    """Main processing function with MoviePy 2.x resource management"""
    clips_to_close = []

    try:
        # Load and process images
        image_paths = file_directory.get_image_files(
            BASE_DIR.joinpath('media', 'image'), load_clips=False)
        if not image_paths:
            raise ValueError("No images found in media/image directory")

        # Create ImageClip objects
        # raw_clips = [fit_to_screen(ImageClip(p)) for p in image_paths]
        raw_clips = [
            create_base_composite_clip(
                fit_to_screen(ImageClip(p)),
                duration=IMAGE_VIEW_DURATION,
                background_color=(0, 0, 0),  # or any color you want
                overlays=None,               # or pass overlays like watermark/face
                size=CURRENT_SIZE
            )
            for p in image_paths
        ]
        clips_to_close.extend(raw_clips)

        # Process clips
        total_duration = calculate_total_duration(len(raw_clips))
        final_clips = add_transitions(raw_clips)
        clips_to_close.extend(final_clips)

        # Create main video
        main_video = CompositeVideoClip(final_clips, size=CURRENT_SIZE)

        # Add face overlay
        face_clip = add_face_overlay(total_duration)
        if face_clip:
            print('face clip :', face_clip)
            clips_to_close.append(face_clip)
            main_video = CompositeVideoClip([
                main_video,
                face_clip.with_layer(1)
            ], size=CURRENT_SIZE)

        # Add audio
        audio_paths = file_directory.get_audio_files(
            BASE_DIR.joinpath('media', 'audio'))
        # audio_clip = None
        if audio_paths:
            audio_clip = random.choice(audio_paths)
            audio_clip.with_duration(total_duration)
            clips_to_close.append(audio_clip.with_duration(total_duration))

        # Final composition
        final = main_video.with_audio(audio_clip) if audio_clip else main_video

        # Export video
        output_name = f"output_{''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=3))}.mp4"
        final.write_videofile(
            output_name,
            fps=20,
            codec="libx264",
            preset='fast',
            ffmpeg_params=[
                '-crf', '18',
                '-movflags', '+faststart',
                '-pix_fmt', 'yuv420p'
            ]
        )
        print(f"Successfully created {output_name}")

    finally:
        # Cleanup resources
        for clip in clips_to_close:
            try:
                if hasattr(clip, 'close'):
                    clip.close()
                    print('clips are closed')
            except Exception as e:
                print(f"Error closing clip: {e}")


if __name__ == "__main__":
    main()
