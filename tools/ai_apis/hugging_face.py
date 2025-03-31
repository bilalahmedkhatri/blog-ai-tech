from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os

load_dotenv()

HUGGINGFACE_API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")


def huggingface_api(
    model_provider,
    model: str = "",
    str_prompt: str = "",
    bytes_prompt: bytes = b"",
    max_new_tokens: int = 100,
):
    """
    Generates a YouTube Shorts script using a Hugging Face AI models.

    Parameters:
    str_prompt (str): The prompt for generating the script.
    bytes_prompt (bytes): The prompt in bytes format.
    model_id (str): The Hugging Face model ID for text, image, or video generation.

    Returns:
    str: Generated script for YouTube Shorts, instagram shorts, facebook shorts, or tiktok shorts.
    """
    

    if model is None:
        return "Failed to fetch a model for text or image generation."

    client = InferenceClient(
        provider=model_provider,
        api_key=HUGGINGFACE_API_TOKEN,
    )

    messages = []

    if str_prompt:
        print(f"str_prompt : {str_prompt}")
        messages.append({
            "role": "user",
            "content": str_prompt 
        })
        """
            Hook (0-3 sec):
                Scene Description + Text Overlay: Start with a bold question/statement/action to grab attention.
                Example: "Did you know [SHOCKING FACT]? 🔥" + dynamic zoom effect.

            Key Content (10-45 sec):
                Scene 1 (5 sec): Quick tip/demo/example of [Key Point 1] + text overlay (emoji + 3-5 words).
                Scene 2 (5 sec): Contrast "Mistake vs. Pro Tip" or "Before vs. After" using split-screen.
                Scene 3 (5 sec): Share a relatable story/statistic about [Key Point 2] + text animation.

            Closing (45-60 sec):
                Call-to-Action: "Follow for more [TOPIC] hacks!" + arrow pointing to subscribe button.
                End with a punchy phrase or meme-worthy visual related to the topic.

            Tone: [Choose: Humorous/Dramatic/Upbeat/Relatable] + use emojis 🚀/💡/🎯
        """
        # })

    elif bytes_prompt:
        print(f"bytes_prompt : {bytes_prompt}")
        messages.extend([
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this image in one sentence."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                        },
                    },
                ],
            }
        ])


    try:
        completion = client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=500,
        )

        print(f" messages : {messages}")

        return completion.choices[0].message

    except Exception as e:
        print(f"Error generating script: {e}")
        return "An error occurred while generating the script."


# Example usage
if __name__ == "__main__":
    model_provider = "novita"
    model = "deepseek-ai/DeepSeek-R1"
    str_prompt = """
       Generate a high-energy YouTube Shorts script under 60 seconds about **[The Highest Mileage Muscle Car Ever]**.  
- **Hook (0-3 sec)**: Start with *"This muscle car drove 1.6 MILLION miles 🚖💥"* + bold text overlay showing a retro Plymouth Fury.  
- **Scene 1 (5 sec)**: Demonstrate **[Joe Vaillancourt’s daily 130-mile taxi routine]** with a retro Montreal street montage + text: *"34 years. Zero days off. 🔧"*.  
- **Scene 2 (5 sec)**: Contrast **[Typical muscle car lifespan vs. Fury’s insane mileage]** using split-screen (burnout vs. odometer) + text: *"Power vs. Persistence 🏁"*.  
- **Scene 3 (5 sec)**: Highlight **[Daily hand-washing, weekly oil changes]** with fast DIY garage clips + text: *"Obsession kept it alive ✨"*.  
- **Closing**: End with *"Follow for more insane car stories!"* + meme of Fury’s restored version drifting.  
**Tone**: **[Dramatic/Relatable]** + 🚗/💪/🔥 emojis.  
**Visuals**: Suggest **["1970s retro synth" music]** + grainy filter for vintage vibe.  
    
    """
    try:
        script = huggingface_api(model_provider, model, str_prompt)
        print("Generated YouTube Short Script:")
        print(script)
    except Exception as e:
        print(f"An error occurred: {e}")
