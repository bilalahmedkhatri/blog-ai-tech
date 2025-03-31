from pathlib import Path
from tools.utils import FileDirectory
from moviepy import AudioFileClip, CompositeVideoClip, concatenate_videoclips, config, ImageClip
from moviepy.video.fx import CrossFadeIn, CrossFadeOut
BASE_DIR = Path(__file__).resolve().parent
print('ffmpeg binary path', config.FFMPEG_BINARY)

config.FFMPEG_BINARY = "C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe"
file_directory = FileDirectory()

def main():
    show_img_dur = 5  # seconds
    # load images
    img_list = file_directory.get_image_files(BASE_DIR.joinpath('media', 'image'), load_clips=False)
    
    clips = []
    start_time = 0
    transition_duration = 1

    for i, image_path in enumerate(img_list):
        print("", i, 'image path: ', image_path)
        
        image_clip = ImageClip(image_path, duration=show_img_dur)
        if i > 0:
            image_clip = image_clip.with_start(start_time)
            image_clip.with_effects([CrossFadeIn(transition_duration)])
                # start_time).crossfadein(transition_duration)
        else: # set_start for first image too
            image_clip = image_clip.with_start(start_time)

        # if i < len(img_list) - 1:
        #     image_clip = image_path.with_end(
        #         start_time + show_img_dur + transition_duration).with_effects(CrossFadeOut(transition_duration))
        # else:
        #     # set end time for last image clip
        #     image_clip = image_path.with_end(start_time + show_img_dur)
        print('image clip duration: ', image_clip, image_clip.duration)
        clips.append(image_clip)
        start_time += show_img_dur
    
    audio_file = BASE_DIR.joinpath('media', 'audio', 'audio_01.mp3')
    audio = AudioFileClip(str(audio_file))
    # image_sequance = concatenate_videoclips(img_list, method="compose")
    print('clips length', clips)
    # video_clips = []
    # all_clips = [image_sequance.with_audio(audio)]
    # all_clips = [clips.with_audio(audio)]
    final_clip = concatenate_videoclips(clips, method="compose")
    final_video = final_clip.with_audio(audio)

    # if final_video.duration < audio.duration:
    #     final_video = final_video.loop(duration=audio.duration)
    # else:
    #     final_video = final_video.subclip(0, audio.duration)

    final_video.write_videofile(rf"{BASE_DIR}\output.mp4", codec="libx264", fps=10)
    # final_video.write_videofile(f"{BASE_DIR}\output.mp4", codec="libx264", fps=10, ffmpeg_params=[
    #                             '-vcodec', 'h264_amf'])


if __name__ == "__main__":
    main()


# 5 image path:  ['_TEMP_FILES_PREFIX', '__add__', '__and__', '__class__', '__copy__', '__del__', '__delattr__', '__dict__'it__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__init__', '__ini '__lt__', '__matmul__', '__module__', '__mul__', '__ne__', '__new__', '__or__', '__reduce__', '__reduce_ex__', '__repr__'of__', '__str__', '__subclasshook__', '__truediv__', '__weakref__', 'aspect_ratio', 'audio', 'close', 'compose_mask', 'comed', 'display_in_notebook', 'duration', 'end', 'fill_array', 'frame_function', 'get_frame', 'h', 'has_constant_size', 'imas_mask', 'is_playing', 'iter_frames', 'layer_index', 'mask', 'memoize', 'memoized_frame', 'memoized_t', 'n_frames', 'pos',s', 'resized', 'rotated', 'save_frame', 'show', 'size', 'start', 'subclipped', 'time_transform', 'to_ImageClip', 'to_RGB', 'w', 'with_audio', 'with_background_color', 'with_duration', 'with_effects', 'with_effects_on_subclip', 'with_end', 'withwith_layer_index', 'with_mask', 'with_memoize', 'with_opacity', 'with_position', 'with_section_cut_out', 'with_speed_scaleupdated_frame_function', 'with_volume_scaled', 'without_audio', 'without_mask', 'write_gif', 'write_images_sequen