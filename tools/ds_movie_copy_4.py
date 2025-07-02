# Code update with qodo 
import random
import math
import numpy as np
from pathlib import Path
from PIL import Image
from moviepy import AudioFileClip, ImageClip, ColorClip, CompositeVideoClip, TextClip
from moviepy.video.fx import CrossFadeIn, CrossFadeOut, Resize
from utils import FileDirectory
import json

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
ZOOM_RATIO = 0.80  # 80% zoom effect

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
        # Correct crop box: (left, upper, right, lower)
        img = img.crop((
            x, y, x + base_size[0], y + base_size[1]
        )).resize(base_size, Image.Resampling.LANCZOS)

        result = np.array(img)
        img.close()
        return result

    try:
        return clip.transform(effect_func)
    except Exception as e:
        print(f"Error applying Ken Burns effect: {e}")
        return clip  # fallback to original

def add_transitions(clips):
    """Add crossfade transitions between clips"""
    if len(clips) <= 1:
        return clips

    final_clips = []

    for i, clip in enumerate(clips):
        print(f"Processing clip {i+1}/{len(clips)}")
        try:
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
        except Exception as e:
            print(f"Error processing clip {i+1}: {e}")

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
    """
    try:
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
    except Exception as e:
        print(f"Error creating base composite clip: {e}")
        return image_clip.with_duration(duration)

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

def create_first5_words_highlighted_clips(transcript_path, size=CURRENT_SIZE, font_size=60, base_color='white', highlight_color='yellow', highlight_text_color='black', position=('center', 'top')):
    """Show first 5 words as a phrase, highlight each word with a background box in sync with voiceover."""
    try:
        from PIL import Image as PILImage, ImageDraw
        import numpy as np
        with open(transcript_path, 'r', encoding='utf-8') as f:
            transcript = json.load(f)
        clips = []
        for seg in transcript.get('segments', []):
            words = seg.get('words', [])[:5]
            if not words:
                continue
            phrase = ' '.join([w['text'] for w in words])
            seg_start = words[0]['start']
            seg_end = words[-1]['end']
            # Base phrase (all words, base color, centered)
            try:
                base_clip = TextClip(
                    text=phrase,
                    font_size=font_size,
                    color=base_color,
                    size=size,
                    method='caption',
                ).with_start(seg_start).with_duration(seg_end-seg_start).with_position(position)
                clips.append(base_clip)
            except Exception as e:
                print(f"Error creating base phrase clip: {e}")
                continue
            # Highlight each word in sync, overlay at correct position in centered phrase
            try:
                # Render the phrase to get pixel positions
                phrase_clip = TextClip(text=phrase, font_size=font_size, color=base_color, method='label')
                phrase_img = phrase_clip.get_frame(0)
                if phrase_img is None:
                    print(f"Error: phrase_img is None for phrase '{phrase}'")
                    continue
                # Split phrase into words and measure their pixel widths
                word_imgs = []
                x_cursor = 0
                for word in words:
                    word_clip = TextClip(text=word['text'], font_size=font_size, color=base_color, method='label').with_position(position)
                    word_img = word_clip.get_frame(0)
                    if word_img is None:
                        print(f"Error: word_img is None for word '{word['text']}'")
                        word_clip.close()
                        continue
                    w, h = word_img.shape[1], word_img.shape[0]
                    word_imgs.append((word_img, w, h))
                    word_clip.close()
                if not word_imgs or len(word_imgs) != len(words):
                    print(f"Error: Could not render all word images for phrase '{phrase}'")
                    phrase_clip.close()
                    continue
                # Calculate x offsets for each word in the phrase
                word_x_offsets = []
                for word_img, w, h in word_imgs:
                    word_x_offsets.append(x_cursor)
                    x_cursor += w + phrase_clip.size[0]//(len(words)*20)  # add small space
                # Center the phrase in the video
                phrase_w, phrase_h = phrase_clip.size
                video_w, video_h = size
                x_center = (video_w - phrase_w) // 2
                y_center = 'center' if position[1] == 'top' else (video_h - phrase_h) // 2
                # For each word, overlay highlight box and text at correct position
                for idx, word in enumerate(words):
                    word_text = word['text']
                    start = word['start']
                    end = word['end']
                    duration = end - start
                    if not word_text or duration <= 0:
                        continue
                    word_x = x_center + word_x_offsets[idx]
                    word_w = word_imgs[idx][1]
                    word_h = word_imgs[idx][2]
                    # Create yellow box as background
                    try:
                        box_img = PILImage.new('RGBA', (word_w, word_h), highlight_color)
                        box_np = np.array(box_img)
                        box_clip = ImageClip(box_np).with_start(start).with_duration(duration).with_position((word_x, y_center))
                        # Create word text (on top of box)
                        word_clip = TextClip(
                            text=word_text,
                            font_size=font_size,
                            color=highlight_text_color,
                            method='label',
                        ).with_start(start).with_duration(duration).with_position((word_x, y_center))
                        clips.append(box_clip)
                        clips.append(word_clip)
                    except Exception as e:
                        print(f"Error creating highlight for word '{word_text}': {e}")
                phrase_clip.close()
            except Exception as e:
                print(f"Error in highlight logic: {e}")
        return clips
    except Exception as e:
        print(f"Error loading transcript: {e}")
        return []

def close_clip_safe(clip):
    """Safely close a MoviePy clip, catching exceptions."""
    try:
        if hasattr(clip, 'close'):
            clip.close()
    except Exception as e:
        print(f"Error closing clip: {e}")

def main():
    """Main processing function with MoviePy 2.x resource management"""
    clips_to_close = []
    audio_clip = None
    final = None

    try:
        # Load and process images
        image_paths = file_directory.get_image_files(
            BASE_DIR.joinpath('media', 'bikes_test'), load_clips=False)
        if not image_paths:
            raise ValueError("No images found in media/image directory")

        # Create ImageClip objects with base composite
        raw_clips = []
        for p in image_paths:
            try:
                img_clip = ImageClip(p)
                img_clip = fit_to_screen(img_clip)
                base_clip = create_base_composite_clip(
                    img_clip,
                    duration=IMAGE_VIEW_DURATION,
                    background_color=(0, 0, 0),
                    overlays=None,
                    size=CURRENT_SIZE
                )
                raw_clips.append(base_clip)
                clips_to_close.append(img_clip)
                clips_to_close.append(base_clip)
            except Exception as e:
                print(f"Error processing image {p}: {e}")

        if not raw_clips:
            raise ValueError("No valid image clips could be created.")

        # Process clips with transitions and effects
        total_duration = calculate_total_duration(len(raw_clips))
        final_clips = add_transitions(raw_clips)
        clips_to_close.extend(final_clips)

        # Create main video
        try:
            main_video = CompositeVideoClip(final_clips, size=CURRENT_SIZE)
            clips_to_close.append(main_video)
        except Exception as e:
            print(f"Error creating main video composite: {e}")
            return

        # Add face overlay
        face_clip = add_face_overlay(total_duration)
        overlays = []
        if face_clip:
            print('face clip :', face_clip)
            clips_to_close.append(face_clip)
            overlays.append(face_clip.with_layer(1))

        # Add first 5 words from each segment as phrase with highlight
        transcript_path = BASE_DIR / 'ds_movie_voice.json'
        word_clips = create_first5_words_highlighted_clips(str(transcript_path), size=CURRENT_SIZE)
        for txt_clip in word_clips:
            overlays.append(txt_clip)
            clips_to_close.append(txt_clip)

        # Compose main video with overlays
        try:
            main_video = CompositeVideoClip([*final_clips, *overlays], size=CURRENT_SIZE)
            clips_to_close.append(main_video)
        except Exception as e:
            print(f"Error creating main video composite: {e}")
            return

        # Add audio
        audio_paths = file_directory.get_audio_files(
            BASE_DIR.joinpath('media', 'audio'))
        if audio_paths:
            try:
                audio_clip = AudioFileClip(str(BASE_DIR / "ds_movie_voice.mp3"))
                # audio_clip = random.choice(audio_paths)
                audio_clip = audio_clip.with_duration(total_duration)
                clips_to_close.append(audio_clip)
            except Exception as e:
                print(f"Error loading audio: {e}")
                audio_clip = None

        # Final composition
        try:
            final = main_video.with_audio(audio_clip) if audio_clip else main_video
        except Exception as e:
            print(f"Error attaching audio: {e}")
            final = main_video

        # Export video
        output_name = f"output_{''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=3))}.mp4"
        try:
            final.write_videofile(
                output_name,
                fps=10,
                codec="libx264",
                preset='fast',
                ffmpeg_params=[
                    '-crf', '18',
                    '-movflags', '+faststart',
                    '-pix_fmt', 'yuv420p'
                ]
            )
            print(f"Successfully created {output_name}")
        except Exception as e:
            print(f"Error exporting video: {e}")

    except Exception as main_e:
        print(f"Fatal error: {main_e}")

    finally:
        # Cleanup resources
        for clip in clips_to_close:
            close_clip_safe(clip)
        if final and hasattr(final, 'close'):
            close_clip_safe(final)
        if audio_clip and hasattr(audio_clip, 'close'):
            close_clip_safe(audio_clip)

if __name__ == "__main__":
    main()