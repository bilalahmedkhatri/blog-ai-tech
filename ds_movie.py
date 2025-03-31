from moviepy import *
from tools.utils import FileDirectory
from pathlib import Path
from moviepy.video.fx import CrossFadeIn, CrossFadeOut
import random

BASE_DIR = Path(__file__).resolve().parent
file_directory = FileDirectory()

# Updated social media video sizes (width, height) in pixels
TARGET_SIZE = {
    "youtube": (1920, 1080),     # 16:9 landscape
    "instagram_feed": (1080, 1080),  # 1:1 square
    "instagram_story": (1080, 1920), # 9:16 portrait
    "facebook": (1200, 630)      # 1.91:1 landscape
}
CURRENT_SIZE = TARGET_SIZE["instagram_story"]  # Select desired platform
IMAGE_VIEW_DURATION = 5  # seconds
TRANSITION_DURATION = 1  # seconds
VIDEO_LENGTH = 30  # seconds

def fit_to_screen(clip):
    """Resize image to fill screen while maintaining aspect ratio"""
    return clip.resized(lambda t: max(
        CURRENT_SIZE[0]/clip.size[0],
        CURRENT_SIZE[1]/clip.size[1]
    )).with_position('center')

    
def add_crossfadein_images(images):
    final_clips = []
    
    for i, clip in enumerate(images):
        # Create base clip with explicit duration
        base_clip = CompositeVideoClip([
            ColorClip(
                size=CURRENT_SIZE,
                color=(0,0,0),  # Black background
                duration=IMAGE_VIEW_DURATION
            ),
            fit_to_screen(clip.with_duration(IMAGE_VIEW_DURATION))
        ]).with_duration(IMAGE_VIEW_DURATION)

        # Add transitions after first clip
        if i > 0:
            base_clip = base_clip.with_effects([
                CrossFadeIn(TRANSITION_DURATION),
                CrossFadeOut(TRANSITION_DURATION)
            ])
            
        final_clips.append(base_clip.with_start(i*(IMAGE_VIEW_DURATION-TRANSITION_DURATION)))
    
    return final_clips

def add_face_overlay():
    """Add animated face overlay with duration validation"""
    faces = file_directory.get_image_files(BASE_DIR.joinpath('media', 'faces'))
    if not faces:
        return None
    return [face.resize(height=200).with_position(('right', 'bottom')) for face in faces]

# Main composition
image_clips = file_directory.get_image_files(BASE_DIR.joinpath('media', 'image'))
final_clips = add_crossfadein_images(image_clips)
final_video = CompositeVideoClip(final_clips, size=CURRENT_SIZE).with_duration(VIDEO_LENGTH)

# Add face overlay if available
face_overlay = add_face_overlay()
if face_overlay:
    final_with_face = CompositeVideoClip([final_video] + face_overlay)
else:
    final_with_face = final_video

# Audio handling
def add_audio():
    audio_files = BASE_DIR.joinpath('media', 'audio', 'audio_01.mp3')
    if audio_files:
        return AudioFileClip(audio_files).with_duration(VIDEO_LENGTH)
    return None


if __name__ == "__main__":
    final = final_with_face.with_audio(add_audio())
    
    final.write_videofile(
        f"output_{''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=3))}.mp4",
        fps=15,  # Recommended for social media
        codec="libx264",
        preset='fast',
        ffmpeg_params=[
            '-crf', '18',        # Quality range (18-24 is good)
            '-movflags', '+faststart',
            '-pix_fmt', 'yuv420p'  # Ensure compatibility
        ]
    )


    """
    audio parameters and attributes
    
    ['_TEMP_FILES_PREFIX', '__add__', '__class__', '__del__', '__delattr__', '__dict__', '__dir__', '__doc__', '__enter__', '__eq__', '__exit__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', 
    '__lt__', '__module__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'audiopreview', 'buffersize', 'close', 'copy', 'display_in_notebook', 
    'duration', 'end', 'filename', 'fps', 'frame_function', 'get_frame', 'is_playing', 'iter_chunks', 'iter_frames', 'max_volume', 'memoize', 'memoized_frame', 'memoized_t', 'nchannels', 'reader', 'start', 'subclipped', 'time_transform', 'to_soundarray', 'transform', 'with_duration', 'with_effects', 'with_end', 'with_fps', 'with_is_mask', 'with_memoize', 'with_section_cut_out', 'with_speed_scaled', 'with_start', 'with_updated_frame_function', 'with_volume_scaled', 'write_audiofile']
    """
    

