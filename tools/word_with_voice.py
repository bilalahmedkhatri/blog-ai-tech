import json
import re
from typing import List, Dict, Tuple, Optional, Union
from pathlib import Path
from moviepy import TextClip, CompositeVideoClip, AudioFileClip
from moviepy.video.fx import FadeIn, FadeOut
import speech_recognition as sr
from pydub import AudioSegment
from pydub.silence import split_on_silence
import numpy as np
from difflib import SequenceMatcher
import time
import platform
import os

# Import the transcription function from your existing module
try:
    from .audio_transcription import transcribe_audio_to_json
except ImportError:
    try:
        from audio_transcription import transcribe_audio_to_json
    except ImportError:
        print("Warning: audio_transcription module not found. Whisper transcription will not be available.")
        transcribe_audio_to_json = None

class TextVoiceHighlighter:
    """
    A class to handle text highlighting synchronized with voice in video clips.
    Provides functionality to add animated text overlays that highlight in sync with audio.
    """
    
    def __init__(self, 
                 font_size: int = 50,
                 font_color: str = 'white',
                 highlight_color: str = 'yellow',
                 font_family: Optional[str] = None,
                 text_position: Tuple[str, str] = ('center', 'bottom'),
                 background_color: Optional[str] = None,
                 stroke_color: Optional[str] = 'black',
                 stroke_width: int = 2,
                 similarity_threshold: float = 0.6,
                 max_recognition_attempts: int = 3,
                 recognition_timeout: float = 10.0,
                 use_whisper: bool = True):
        """
        Initialize the TextVoiceHighlighter with styling options.
        
        Args:
            font_size: Size of the text font
            font_color: Default color of the text
            highlight_color: Color when text is highlighted
            font_family: Font family to use (None for system default)
            text_position: Position of text on screen (x, y)
            background_color: Background color for text (optional)
            stroke_color: Stroke color for text outline
            stroke_width: Width of text stroke
            similarity_threshold: Minimum similarity for text matching (0.0-1.0)
            max_recognition_attempts: Maximum attempts for speech recognition
            recognition_timeout: Timeout for speech recognition requests
            use_whisper: Whether to use whisper for transcription (preferred)
        """
        self.font_size = font_size
        self.font_color = font_color
        self.highlight_color = highlight_color
        self.font_family = self._get_available_font(font_family)
        self.text_position = text_position
        self.background_color = background_color
        self.stroke_color = stroke_color
        self.stroke_width = stroke_width
        self.similarity_threshold = similarity_threshold
        self.max_recognition_attempts = max_recognition_attempts
        self.recognition_timeout = recognition_timeout
        self.use_whisper = use_whisper and transcribe_audio_to_json is not None
        
        # Voice recognition setup (fallback)
        try:
            self.recognizer = sr.Recognizer()
            self.recognizer.energy_threshold = 300
            self.recognizer.dynamic_energy_threshold = True
            self.recognizer.pause_threshold = 0.8
            self.recognizer.operation_timeout = recognition_timeout
        except Exception as e:
            print(f"Warning: Speech recognition setup failed: {e}")
            self.recognizer = None
        
        self.text_segments = []
        self.timing_data = []
    
    def _get_available_font(self, preferred_font: Optional[str]) -> Optional[str]:
        """
        Get an available font from the system, with fallbacks.
        
        Args:
            preferred_font: The preferred font name
            
        Returns:
            Available font name or None for system default
        """
        if not preferred_font:
            return None
        
        # Common font fallbacks by platform
        system = platform.system().lower()
        
        font_fallbacks = {
            'windows': [
                preferred_font,
                'Arial-Bold',
                'Arial',
                'Calibri-Bold',
                'Calibri',
                'Segoe-UI-Bold',
                'Segoe-UI',
                'Tahoma-Bold',
                'Tahoma'
            ],
            'darwin': [  # macOS
                preferred_font,
                'Arial-Bold',
                'Arial',
                'Helvetica-Bold',
                'Helvetica',
                'San-Francisco-Bold',
                'San-Francisco'
            ],
            'linux': [
                preferred_font,
                'DejaVu-Sans-Bold',
                'DejaVu-Sans',
                'Liberation-Sans-Bold',
                'Liberation-Sans',
                'Ubuntu-Bold',
                'Ubuntu'
            ]
        }
        
        # Get fallbacks for current system
        fallbacks = font_fallbacks.get(system, [preferred_font, 'Arial', 'DejaVu-Sans'])
        
        # Test each font
        for font in fallbacks:
            try:
                # Try to create a test text clip to verify font availability
                test_clip = TextClip("Test", font=font, font_size=12)
                test_clip.close()
                print(f"Using font: {font}")
                return font
            except Exception:
                continue
        
        print("Using system default font")
        return None
    
    def load_text_script(self, script_path: Union[str, Path]) -> List[str]:
        """
        Load text script from file (supports .txt and .json formats).
        
        Args:
            script_path: Path to the script file
            
        Returns:
            List of text segments
        """
        script_path = Path(script_path)
        
        if not script_path.exists():
            raise FileNotFoundError(f"Script file not found: {script_path}")
        
        try:
            if script_path.suffix.lower() == '.json':
                with open(script_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    return data.get('segments', [])
            else:
                with open(script_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Improved text splitting - try multiple methods
                    segments = self._smart_text_split(content)
                    return segments
        except Exception as e:
            print(f"Error loading script file: {e}")
            return []
    
    def _smart_text_split(self, text: str) -> List[str]:
        """
        Intelligently split text into segments using multiple strategies.
        
        Args:
            text: Input text to split
            
        Returns:
            List of text segments
        """
        # Clean the text
        text = text.strip()
        
        if not text:
            return []
        
        # Try different splitting strategies
        strategies = [
            # Split by sentences
            lambda t: re.split(r'[.!?]+\s+', t),
            # Split by line breaks
            lambda t: [line.strip() for line in t.split('\n') if line.strip()],
            # Split by double spaces or tabs
            lambda t: re.split(r'\s{2,}|\t+', t),
            # Split by commas and semicolons for shorter segments
            lambda t: re.split(r'[,;]+\s+', t)
        ]
        
        best_segments = []
        best_count = 0
        
        for strategy in strategies:
            try:
                segments = strategy(text)
                segments = [seg.strip() for seg in segments if seg.strip()]
                if len(segments) > best_count:
                    best_segments = segments
                    best_count = len(segments)
            except Exception:
                continue
        
        return best_segments if best_segments else [text]
    
    def load_whisper_segments(self, json_path: Union[str, Path]) -> List[Dict]:
        """
        Load segments from whisper transcription JSON file.
        
        Args:
            json_path: Path to the JSON file generated by transcribe_audio_to_json
            
        Returns:
            List of timing data with start/end times and text
        """
        json_path = Path(json_path)
        
        if not json_path.exists():
            raise FileNotFoundError(f"Whisper JSON file not found: {json_path}")
        
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            timing_data = []
            
            # Extract segments from whisper output
            segments = data.get('segments', [])
            
            if not segments:
                print("Warning: No segments found in whisper JSON file")
                return []
            
            for i, segment in enumerate(segments):
                start_time = segment.get('start', 0.0)
                end_time = segment.get('end', 0.0)
                text = segment.get('text', '').strip()
                
                if text:  # Only add segments with text
                    timing_data.append({
                        'start': start_time,
                        'end': end_time,
                        'text': text,
                        'duration': end_time - start_time,
                        'chunk_index': i,
                        'confidence': segment.get('confidence', 1.0) if 'confidence' in segment else 1.0
                    })
            
            print(f"Loaded {len(timing_data)} segments from whisper transcription")
            self.timing_data = timing_data
            return timing_data
            
        except Exception as e:
            print(f"Error loading whisper segments: {e}")
            return []
    
    def transcribe_audio_with_whisper(self, audio_path: Union[str, Path], 
                                    output_json_path: Optional[Union[str, Path]] = None) -> List[Dict]:
        """
        Transcribe audio using whisper and return timing data.
        
        Args:
            audio_path: Path to the audio file
            output_json_path: Path to save the JSON result (optional)
            
        Returns:
            List of timing data with start/end times and text
        """
        if not self.use_whisper:
            print("Whisper transcription not available")
            return []
        
        audio_path = Path(audio_path)
        
        if not audio_path.exists():
            raise FileNotFoundError(f"Audio file not found: {audio_path}")
        
        try:
            # Generate JSON path if not provided
            if not output_json_path:
                output_json_path = audio_path.with_suffix('.json')
            
            print(f"Transcribing audio with whisper: {audio_path}")
            
            # Use the existing transcribe_audio_to_json function
            success = transcribe_audio_to_json(str(audio_path), str(output_json_path))
            
            if success:
                # Load the generated segments
                return self.load_whisper_segments(output_json_path)
            else:
                print("Whisper transcription failed")
                return []
                
        except Exception as e:
            print(f"Error transcribing audio with whisper: {e}")
            return []
    
    def create_text_clip(self, 
                        text: str, 
                        start_time: float, 
                        duration: float,
                        highlight: bool = False) -> Optional[TextClip]:
        """
        Create a text clip with specified styling and timing.
        
        Args:
            text: Text content to display
            start_time: When the text should appear
            duration: How long the text should be visible
            highlight: Whether to use highlight color
            
        Returns:
            TextClip object or None if creation fails
        """
        if not text or not text.strip():
            print("Warning: Empty text provided for text clip")
            return None
            
        if duration <= 0:
            print("Warning: Invalid duration for text clip")
            return None
            
        try:
            color = self.highlight_color if highlight else self.font_color
            
            # Create text clip with or without font specification
            if self.font_family:
                text_clip = TextClip(
                    text=text.strip(),
                    font_size=self.font_size,
                    color=color,
                    font=self.font_family,
                    stroke_color=self.stroke_color,
                    stroke_width=self.stroke_width,
                    bg_color=self.background_color
                )
            else:
                # Use system default font
                text_clip = TextClip(
                    text=text.strip(),
                    font_size=self.font_size,
                    color=color,
                    stroke_color=self.stroke_color,
                    stroke_width=self.stroke_width,
                    bg_color=self.background_color
                )
            
            text_clip = text_clip.with_duration(duration).with_start(start_time).with_position(self.text_position)
            return text_clip
            
        except Exception as e:
            print(f"Error creating text clip: {e}")
            # Try without stroke as fallback
            try:
                color = self.highlight_color if highlight else self.font_color
                text_clip = TextClip(
                    text=text.strip(),
                    font_size=self.font_size,
                    color=color,
                    bg_color=self.background_color
                ).with_duration(duration).with_start(start_time).with_position(self.text_position)
                return text_clip
            except Exception as e2:
                print(f"Fallback text clip creation also failed: {e2}")
                return None
    
    def add_text_to_video(self, 
                         video_clip, 
                         script_path: Optional[Union[str, Path]] = None,
                         audio_path: Optional[Union[str, Path]] = None,
                         whisper_json_path: Optional[Union[str, Path]] = None,
                         manual_segments: Optional[List[Dict]] = None,
                         use_simple_timing: bool = False) -> CompositeVideoClip:
        """
        Add synchronized text highlighting to a video clip.
        
        Args:
            video_clip: The main video clip
            script_path: Path to text script file (optional)
            audio_path: Path to audio file for timing analysis (optional)
            whisper_json_path: Path to existing whisper JSON file (optional)
            manual_segments: Manually provided text segments with timing (optional)
            use_simple_timing: If True, distribute text evenly across video duration
            
        Returns:
            CompositeVideoClip with text overlays
        """
        if not video_clip:
            print("Error: No video clip provided")
            return video_clip
            
        try:
            text_clips = []
            
            if manual_segments:
                # Use manually provided segments
                for segment in manual_segments:
                    if not isinstance(segment, dict) or 'text' not in segment:
                        continue
                        
                    text_clip = self.create_text_clip(
                        text=segment['text'],
                        start_time=segment.get('start', 0),
                        duration=segment.get('duration', 1),
                        highlight=segment.get('highlight', False)
                    )
                    if text_clip:
                        text_clips.append(text_clip)
            
            elif whisper_json_path:
                # Use existing whisper JSON file
                timing_data = self.load_whisper_segments(whisper_json_path)
                
                if timing_data:
                    for segment in timing_data:
                        text_clip = self.create_text_clip(
                            text=segment['text'],
                            start_time=segment['start'],
                            duration=segment['duration'],
                            highlight=segment.get('confidence', 1.0) > 0.7
                        )
                        if text_clip:
                            text_clips.append(text_clip)
                else:
                    print("Failed to load whisper segments, using simple timing")
                    use_simple_timing = True
            
            elif script_path:
                # Load script
                text_segments = self.load_text_script(script_path)
                print(f"Loaded {len(text_segments)} text segments")
                
                if not text_segments:
                    print("No text segments loaded")
                    return video_clip
                
                if use_simple_timing or not audio_path:
                    # Use simple even distribution
                    video_duration = getattr(video_clip, 'duration', 10)  # Default to 10 seconds if no duration
                    segment_duration = video_duration / len(text_segments)
                    
                    for i, text in enumerate(text_segments):
                        start_time = i * segment_duration
                        text_clip = self.create_text_clip(
                            text=text,
                            start_time=start_time,
                            duration=segment_duration,
                            highlight=False
                        )
                        if text_clip:
                            text_clips.append(text_clip)
            
            else:
                print("Warning: No text data provided")
                return video_clip
            
            if text_clips:
                # Combine video with text overlays
                all_clips = [video_clip] + text_clips
                try:
                    composite = CompositeVideoClip(all_clips, size=video_clip.size)
                    return composite
                except Exception as e:
                    print(f"Error creating composite video: {e}")
                    return video_clip
            else:
                print("No text clips created, returning original video")
                return video_clip
                
        except Exception as e:
            print(f"Error adding text to video: {e}")
            return video_clip
    
    def cleanup(self):
        """Clean up any temporary resources"""
        try:
            # Clean up any temporary files
            temp_files = Path('.').glob('temp_chunk_*.wav')
            for temp_file in temp_files:
                temp_file.unlink(missing_ok=True)
        except Exception as e:
            print(f"Error during cleanup: {e}")


# Example usage functions
def create_video_with_whisper_transcription(video_path: str, script_path: str, audio_path: str, output_path: str):
    """
    Example function using whisper transcription for better accuracy.
    """
    from moviepy import VideoFileClip
    
    try:
        # Load video
        video = VideoFileClip(video_path)
        
        # Initialize highlighter with whisper enabled
        highlighter = TextVoiceHighlighter(
            font_size=60,
            font_color='white',
            highlight_color='#FFD700',
            font_family=None,  # Use system default font
            text_position=('center', 'bottom'),
            stroke_color='black',
            stroke_width=2,
            similarity_threshold=0.3,
            use_whisper=True  # Enable whisper transcription
        )
        
        # Add text overlay using whisper transcription
        final_video = highlighter.add_text_to_video(
            video_clip=video,
            script_path=script_path,
            audio_path=audio_path,
            use_simple_timing=False  # Use whisper timing
        )
        
        # Export video
        final_video.write_videofile(output_path, codec='libx264', audio_codec='aac')
        
        # Cleanup
        highlighter.cleanup()
        video.close()
        final_video.close()
        
        print(f"Video with whisper-based text overlay saved to: {output_path}")
        
    except Exception as e:
        print(f"Error creating video with whisper transcription: {e}")


def create_video_with_existing_whisper_json(video_path: str, whisper_json_path: str, output_path: str):
    """
    Example function using existing whisper JSON file.
    """
    from moviepy import VideoFileClip
    
    try:
        # Load video
        video = VideoFileClip(video_path)
        
        # Initialize highlighter
        highlighter = TextVoiceHighlighter(
            font_size=60,
            font_color='white',
            highlight_color='#FFD700',
            font_family=None,
            text_position=('center', 'bottom'),
            stroke_color='black',
            stroke_width=2
        )
        
        # Add text overlay using existing whisper JSON
        final_video = highlighter.add_text_to_video(
            video_clip=video,
            whisper_json_path=whisper_json_path
        )
        
        # Export video
        final_video.write_videofile(output_path, codec='libx264', audio_codec='aac')
        
        # Cleanup
        highlighter.cleanup()
        video.close()
        final_video.close()
        
        print(f"Video with whisper JSON overlay saved to: {output_path}")
        
    except Exception as e:
        print(f"Error creating video with whisper JSON: {e}")


if __name__ == "__main__":
    # Example usage with whisper transcription
    # create_video_with_whisper_transcription(
    #     video_path="input_video.mp4",
    #     script_path="ds_movie_voice_text.txt",
    #     audio_path="ds_movie_voice.mp3",
    #     output_path="output_with_whisper_text.mp4"
    # )
    
    # Or use existing whisper JSON file
    create_video_with_existing_whisper_json(
        video_path=r"G:\\Development\\auto_movie_editor\\tools\\input_video.mp4",
        whisper_json_path=r"G:\\Development\\auto_movie_editor\\tools\\ds_movie_voice.json",
        output_path=r"G:\\Development\\auto_movie_editor\\tools\\output_with_whisper_json.mp4"
    )