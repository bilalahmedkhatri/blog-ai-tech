from typing import Optional, List, Any
from db import Parameter, engine
from sqlmodel import Session, select
from moviepy import ImageClip, VideoClip, CompositeVideoClip
from media_file import ImageMedia
from audio import AudioMedia
from effects import ZoomInEffect, SideLeftTransition
from PIL import Image
import numpy

# Service to fetch parameters from the database.
class ParameterService:
    @staticmethod
    def get_parameter(key: str, default: Any = None) -> Any:
        with Session(engine) as session:
            statement = select(Parameter).where(Parameter.key == key)
            result = session.exec(statement).first()
            if result:
                return result.value
        return default


class VideoComposer:
    def __init__(self, image_items: List[ImageMedia], audio_item: Optional[AudioMedia] = None):
        self.image_items = image_items
        self.audio_item = audio_item

        # Retrieve parameters from the database (with defaults)
        target_size_str = ParameterService.get_parameter(
            "TARGET_SIZE", "{'youtube_short': (1080, 1920)}")
        self.target_size = eval(target_size_str)["youtube_short"]
        self.image_view_duration = float(
            ParameterService.get_parameter("IMAGE_VIEW_DURATION", 5))
        self.transition_duration = float(
            ParameterService.get_parameter("TRANSITION_DURATION", 1))
        self.zoom_ratio = float(
            ParameterService.get_parameter("ZOOM_RATIO", 0.00))
        self.zoom_approve = ParameterService.get_parameter(
            "ZOOM_APPROVE", "False") == "True"
        self.face_overlay_conform = ParameterService.get_parameter(
            "FACE_OVERLAY_CONFORM", "False") == "True"

    def fit_to_screen(self, clip: ImageClip) -> ImageClip:
        target_w, target_h = self.target_size
        scale = max(target_w / clip.w, target_h / clip.h)
        print("Step 9: Fitting clip to screen with scale", scale)
        return clip.resize(scale).with_position('center')

    def create_transition_clips(self) -> List[VideoClip]:
        print("Step 10: Creating transition clips")
        clips = []
        for i, media_item in enumerate(self.image_items):
            # Apply no effects initially; add effects as needed.
            img = media_item.apply_effects([])
            clip = ImageClip(numpy.array(img)).with_duration(
                self.image_view_duration)
            clip = self.fit_to_screen(clip)
            # Optionally apply a zoom effect if approved.
            if self.zoom_ratio >= 0.01 and self.zoom_approve:
                zoom_effect = ZoomInEffect(self.zoom_ratio)
                img = zoom_effect.apply(img)
                clip = ImageClip(numpy.array(img)).with_duration(
                    self.image_view_duration)
                clip = self.fit_to_screen(clip)
            # Apply transition effect for clips after the first one.
            if i > 0:
                transition = SideLeftTransition()
                clip = transition.apply(clip)
            clips.append(clip)
        return clips

    def compose_video(self) -> CompositeVideoClip:
        clips = self.create_transition_clips()
        print("Step 11: Composing main video")
        main_video = CompositeVideoClip(clips, size=self.target_size)
        # Optionally add audio if provided.
        if self.audio_item:
            audio_clip = self.audio_item.apply_effects([])
            audio_clip = audio_clip.with_duration(main_video.duration)
            main_video = main_video.with_audio(audio_clip)
        return main_video

    def export_video(self, output_path: str):
        main_video = self.compose_video()
        print("Step 12: Exporting video to", output_path)
        main_video.write_videofile(
            output_path,
            fps=15,
            codec="libx264",
            preset='fast'
        )
        main_video.close()
