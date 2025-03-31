# High-level video editor class that ties components together
from asyncio

class VideoEditor:
    def __init__(self):
        self.media_list = []
        self.audio_tracks = []
        self.text_elements = []
        self.stickers = []
        self.filters = []
        self.effects = []
        self.transitions = []
        self.captions = []

    def add_media(self, media: Media):
        self.media_list.append(media)

    def add_audio(self, audio: Audio):
        self.audio_tracks.append(audio)

    def apply_filter(self, filter_: Filter):
        # Apply filter to current media
        pass

    def export(self, output_file: str):
        # Compose all elements and export the final video file
        pass

# Example usage:
if __name__ == '__main__':
    editor = VideoEditor()
    img = ImageMedia()
    img.load("path/to/image.jpg")
    editor.add_media(img)
    
    # Add other elements (audio, text, effects, etc.)
    
    editor.export("final_output.mp4")