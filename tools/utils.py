import os
from typing import List
# from moviepy import ImageClip, VideoFileClip, AudioFileClip
from moviepy import *

class FileDirectory:
    """Get all audio, video, and image files in a directory with proper extensions
    Args:
        directory: Path to search for audio files
        load_clips: If True, returns AudioFileClip, VideoFileClip, and ImageClip objects. If False, returns file paths
    Returns:
        List of AudioFileClip, VideoFileClip, and ImageClip objects or file paths
    """

    def get_audio_files(self, directory: str, load_clips: bool = True) -> List[str]:
        """Get all audio files in a directory"""
        audio_extensions = ('.mp3', '.wav', '.ogg', '.m4a', '.flac', '.aac')
        audio_files = []
        
        # Convert Path object to string if needed
        directory = str(directory)

        for root, _, files in os.walk(directory):
            for file in files:
                if file.lower().endswith(audio_extensions):
                    file_path = os.path.join(root, file)
                    
                    try:
                        if load_clips:
                            # Lazy loading to conserve memory
                            audio_clip = AudioFileClip(file_path)
                            audio_files.append(audio_clip)
                        else:
                            audio_files.append(file_path)
                    except Exception as e:
                        print(f"Error loading {file_path}: {str(e)}")
                        continue
        return audio_files
    
    
    def get_video_files(self, directory: str, load_clips: bool = True) -> List[str]:
        """Get all video files in a directory"""
        video_extensions = ('.mp4', '.avi', '.mov', '.mkv')
        video_files = []
        
        # Convert Path object to string if needed
        directory = str(directory)

        for root, _, files in os.walk(directory):
            for file in files:
                if file.lower().endswith(video_extensions):
                    file_path = os.path.join(root, file)
                    try:
                        if load_clips:
                            # Lazy loading to conserve memory
                            video_clip = VideoFileClip(file_path)
                            video_files.append(video_clip)
                        else:
                            video_files.append(file_path)
                    except Exception as e:
                        print(f"Error loading {file_path}: {str(e)}")
                        continue
        return video_files

    def get_image_files(self, directory: str, load_clips: bool = True, image_duration : int = 5) -> List[str]:
        """Get all Image files in a directory"""
        image_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.gif')
        image_files = []
        
        # Convert Path object to string if needed
        directory = str(directory)

        for root, _, files in os.walk(directory):
            for file in files:
                if file.lower().endswith(image_extensions):
                    file_path = os.path.join(root, file)
                    
                    try:
                        if load_clips:
                            # Lazy loading to conserve memory
                            image_clip = ImageClip(file_path).with_duration(image_duration)
                            image_files.append(image_clip)
                        else:
                            image_files.append(file_path)
                    except Exception as e:
                        print(f"Error loading {file_path}: {str(e)}")
                        continue

        return image_files

    def ensure_directory(path: str) -> bool:
        """Ensure a directory exists, create if it doesn't"""
        try:
            os.makedirs(path, exist_ok=True)
            return True
        except Exception as e:
            print(f"Error creating directory: {e}")
            return False


class Transitions:

    """Add transitions to video clips"""

    def __init__(self, video_clip: VideoFileClip, duration: int = 5):
        self.video_clip = video_clip
        self.duration = duration
        self.file_directory = FileDirectory
    
    def add_transitions(self, **args):
        """Create video clips with transitions, zoom effects, and horizontal movement"""
        final_clips = []
        screen_width, screen_height = CURRENT_SIZE
        
        for i, clip in enumerate(images):
            # Apply zoom effect
            processed_clip = (
                clip.with_duration(IMAGE_VIEW_DURATION)
                .with_effects(add_ken_burns_effect(clip))
            )

            # Apply horizontal movement
            moving_clip = processed_clip.set_position(
                lambda t: (horizontal_position(t, screen_width, IMAGE_VIEW_DURATION), 'center')
            )

            # Create base composite clip
            base_clip = CompositeVideoClip([
                ColorClip(
                    size=CURRENT_SIZE,
                    color=(0, 0, 0),
                    duration=IMAGE_VIEW_DURATION
                ),
                moving_clip
            ]).with_duration(IMAGE_VIEW_DURATION)

            # Add transitions after the first clip
            if i > 0:
                base_clip = base_clip.with_effects([
                    CrossFadeIn(TRANSITION_DURATION),
                    CrossFadeOut(TRANSITION_DURATION)
                ])

            start_time = i * (IMAGE_VIEW_DURATION - TRANSITION_DURATION)
            final_clips.append(base_clip.with_start(start_time))

        return final_clips


#     def trsansition_fade_in_out(self, transition_duration: int = 5):
#         """Add a fade in and fade out transition to a video clip"""

#         start_time = 0
#         clips = []

#         for i, image_path in enumerate(self.file_directory.get_image_files(BASE_DIR.joinpath('media', 'image'), duration=self.duration)):
#             # Create the ImageClip
#             print("", i, 'image path: ', image_path)
#         # --- Transitions ---
#             if i > 0:  # No fade-in on the first image
#                 # Fade In:
#                 image_clip = image_clip.set_start(
#                     start_time).crossfadein(transition_duration)

#             if i < len(image_paths) - 1:  # No fade out for the last image.
#         # Fade out:
#         # set end before applying fade out.
#         image_clip = image_clip.set_end(
#             start_time + duration + transition_duration).crossfadeout(transition_duration)
#     else:
#         # set end time for last image clip
#         image_clip = image_clip.set_end(start_time + duration)

#     clips.append(image_clip)
#     start_time += duration

#     fade_in = CrossFadeIn(video_clip, duration=duration)
#     fade_out = CrossFadeOut(fade_in, duration=duration)
#     return fade_out
