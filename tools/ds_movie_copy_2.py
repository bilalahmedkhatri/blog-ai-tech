from moviepy import *
from moviepy.video.fx import CrossFadeIn, CrossFadeOut, Resize
from tools.utils import FileDirectory
from pathlib import Path
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
ZOOM_INTENSITY = 0.08  # 8% zoom effect

"""
NOTE ABOUT CODE STATUS
es sound pooori lenka aa raha hai, rendering perfect ho rahi hai
"""

def calculate_total_duration(image_count):
    """Calculate video duration based on number of images and transitions"""
    total_video_duration = (image_count * IMAGE_VIEW_DURATION) - ((image_count - 1) * TRANSITION_DURATION)
    print(f"Total video duration: {total_video_duration} seconds and image count: {image_count}")
    return total_video_duration

def add_ken_burns_effect(clip, zoom_direction='in', zoom_speed=0.5):
    """
    Ken Burns effect with configurable zoom direction
    Options: 'in', 'out', 'in-out' (default)
    Speed: 0.1 (slow) to 1.0 (fast)
    """
    duration = clip.duration
    zoom_factor = 1 + (0.2 * zoom_speed)  # Max 20% zoom
    
    def get_scale(t):
        print('t value: ', t, IMAGE_VIEW_DURATION)
        progress = t / IMAGE_VIEW_DURATION
        print('progress ', progress)
        # if zoom_direction == 'in':
        #     return 1 + (zoom_factor - 1) * progress
        # elif zoom_direction == 'out':
        #     return zoom_factor - (zoom_factor - 1) * progress
        # else:  # in-out
        return 1 + (zoom_factor - 1) * math.sin(math.pi * progress)
    
    return clip.with_effects([
        Resize(get_scale)
    ])

def fit_to_screen(clip):
    """Resize image to fill screen while maintaining aspect ratio"""
    return clip.with_effects([
        Resize(lambda t: max(
            CURRENT_SIZE[0]/clip.w,
            CURRENT_SIZE[1]/clip.h
        ))
    ]).with_position('center')

# def add_transitions(images):
#     """Create video clips with transitions and zoom effects"""
#     final_clips = []
    
#     for i, clip in enumerate(images):
#         # Create base clip with explicit duration
#         base_clip = CompositeVideoClip([
#             ColorClip(
#                 size=CURRENT_SIZE,
#                 color=(0,0,0),  # Black background
#                 duration=IMAGE_VIEW_DURATION
#             ),
#             fit_to_screen(clip.with_duration(IMAGE_VIEW_DURATION)),
#             clip.with_effects(lambda c: add_ken_burns_effect(c, zoom_direction='in-out', zoom_speed=0.8))  
#         ]).with_duration(IMAGE_VIEW_DURATION)

def add_transitions(images):
    """Create video clips with transitions and zoom effects"""
    final_clips = []
    
    for i, clip in enumerate(images):
        # Process the image clip first
        processed_clip = (
            clip.with_duration(IMAGE_VIEW_DURATION)
            # .with_effects(fit_to_screen)
            .with_effects(add_ken_burns_effect(clip))
        )

        # Create base composite clip
        base_clip = CompositeVideoClip([
            ColorClip(
                size=CURRENT_SIZE,
                color=(0,0,0),
                duration=IMAGE_VIEW_DURATION
            ),
            processed_clip.with_position('center'),  # Use the processed clip here
            fit_to_screen(clip.with_duration(IMAGE_VIEW_DURATION)),
        ]).with_duration(IMAGE_VIEW_DURATION)

        # Add transitions after first clip
        if i > 0:
            base_clip = base_clip.with_effects([
                CrossFadeIn(TRANSITION_DURATION),
                CrossFadeOut(TRANSITION_DURATION)
            ])
        
        start_time = i * (IMAGE_VIEW_DURATION - TRANSITION_DURATION)    
        final_clips.append(base_clip.with_start(start_time))
    
    return final_clips

def add_face_overlay(total_duration):
    """Add animated face overlay with MoviePy 2.x syntax"""
    face_paths = file_directory.get_image_files(BASE_DIR.joinpath('media', 'faces'), load_clips=False)
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
        image_paths = file_directory.get_image_files(BASE_DIR.joinpath('media', 'image'), load_clips=False)
        if not image_paths:
            raise ValueError("No images found in media/image directory")
        
        # Create ImageClip objects
        raw_clips = [ImageClip(p) for p in image_paths]
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
                main_video.with_layer(1),
                face_clip.with_layer(0)
            ])

        # Add audio
        audio_paths = file_directory.get_audio_files(BASE_DIR.joinpath('media', 'audio'))
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
            fps=24,
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