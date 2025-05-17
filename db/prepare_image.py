import json
import os
import requests
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MEDIA_DIR = BASE_DIR / "media" / "profile_images"
MEDIA_DIR.mkdir(parents=True, exist_ok=True)

# Load the original JSON
with open("userprofile.json", "r") as f:
    data = json.load(f)

for item in data:
    fields = item["fields"]
    image_url = fields.get("profile_image")

    if image_url:
        image_name = image_url.split("/")[-1]
        local_path = MEDIA_DIR / image_name

        # Download and save image
        try:
            response = requests.get(image_url)
            response.raise_for_status()
            with open(local_path, "wb") as img_file:
                img_file.write(response.content)
            print(f"Downloaded: {image_name}")
            # Set path relative to MEDIA root
            fields["profile_image"] = f"profile_images/{image_name}"
        except Exception as e:
            print(f"Failed to download {image_url}: {e}")
            fields["profile_image"] = ""

# Save updated JSON
with open("userprofile_ready.json", "w") as f:
    json.dump(data, f, indent=2)

print("Updated JSON saved as userprofile_ready.json")
