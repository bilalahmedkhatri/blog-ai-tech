import cv2
import numpy as np
from PIL import Image
import os
import requests
import shutil

class ImageSEOProcessor:
    def __init__(self, east_model_path, conf_threshold=0.5, nms_threshold=0.4):
        """
        Initialize the processor.
        :param east_model_path: Path to the pre-trained EAST text detector model.
        :param conf_threshold: Confidence threshold for text detection.
        :param nms_threshold: Non-maxima suppression threshold.
        """
        self.east_model_path = east_model_path
        self.conf_threshold = conf_threshold
        self.nms_threshold = nms_threshold
        # Load the EAST model
        self.net = cv2.dnn.readNet(self.east_model_path)

    def remove_text(self, image_path, output_path, width=320, height=320):
        """
        Automatically detect and remove text from an image using EAST and inpainting.
        The image is resized to a multiple of 32 (required by EAST).
        :param image_path: Input image path.
        :param output_path: Output image path (without text).
        :param width: Resized width (multiple of 32).
        :param height: Resized height (multiple of 32).
        :return: Path to the saved image.
        """
        # Load original image and keep a copy for inpainting
        orig = cv2.imread(image_path)
        if orig is None:
            raise ValueError("Could not load image from " + image_path)
        origH, origW = orig.shape[:2]
        rW = origW / float(width)
        rH = origH / float(height)
        image = cv2.resize(orig, (width, height))
        
        # Construct blob and forward pass through the EAST model
        blob = cv2.dnn.blobFromImage(image, 1.0, (width, height),
                                     (123.68, 116.78, 103.94), swapRB=True, crop=False)
        self.net.setInput(blob)
        (scores, geometry) = self.net.forward(["feature_fusion/Conv_7/Sigmoid",
                                               "feature_fusion/concat_3"])
        (rects, confidences) = self.decode_predictions(scores, geometry)
        indices = cv2.dnn.NMSBoxes(rects, confidences, self.conf_threshold, self.nms_threshold)
        
        # Create a mask for the text regions
        mask = np.zeros(orig.shape[:2], dtype=np.uint8)
        if len(indices) > 0:
            for i in indices.flatten():
                (startX, startY, endX, endY) = rects[i]
                # Scale the bounding boxes back to the original image dimensions
                startX = int(startX * rW)
                startY = int(startY * rH)
                endX = int(endX * rW)
                endY = int(endY * rH)
                cv2.rectangle(mask, (startX, startY), (endX, endY), 255, -1)
        # Use inpainting to remove text
        inpainted = cv2.inpaint(orig, mask, inpaintRadius=3, flags=cv2.INPAINT_TELEA)
        cv2.imwrite(output_path, inpainted)
        return output_path

    def decode_predictions(self, scores, geometry):
        """
        Decode the output of the EAST text detector.
        :param scores: Probability scores.
        :param geometry: Geometry data for bounding boxes.
        :return: A tuple of (rectangles, confidences).
        """
        (numRows, numCols) = scores.shape[2:4]
        rects = []
        confidences = []
        for y in range(0, numRows):
            scoresData = scores[0, 0, y]
            xData0 = geometry[0, 0, y]
            xData1 = geometry[0, 1, y]
            xData2 = geometry[0, 2, y]
            xData3 = geometry[0, 3, y]
            anglesData = geometry[0, 4, y]
            for x in range(0, numCols):
                if scoresData[x] < self.conf_threshold:
                    continue
                (offsetX, offsetY) = (x * 4.0, y * 4.0)
                angle = anglesData[x]
                cos = np.cos(angle)
                sin = np.sin(angle)
                h = xData0[x] + xData2[x]
                w = xData1[x] + xData3[x]
                endX = int(offsetX + (cos * xData1[x]) + (sin * xData2[x]))
                endY = int(offsetY - (sin * xData1[x]) + (cos * xData2[x]))
                startX = int(endX - w)
                startY = int(endY - h)
                rects.append([startX, startY, endX, endY])
                confidences.append(float(scoresData[x]))
        return (rects, confidences)

    def remove_metadata(self, image_path, output_path):
        """
        Remove metadata (e.g. EXIF data) from an image.
        :param image_path: Input image file.
        :param output_path: Output image file (without metadata).
        :return: Path to the saved image.
        """
        image = Image.open(image_path)
        data = list(image.getdata())
        image_no_meta = Image.new(image.mode, image.size)
        image_no_meta.putdata(data)
        image_no_meta.save(output_path)
        return output_path

    def check_orientation_and_size(self, image_path, min_width=800, min_height=600, output_folder=None):
        """
        Check if the image is horizontal (landscape orientation) and meets minimum size.
        If conditions are met and an output_folder is provided, the image is saved there.
        :param image_path: Path of the image to check.
        :param min_width: Minimum width required.
        :param min_height: Minimum height required.
        :param output_folder: Folder where qualifying images are saved.
        :return: True if conditions are met, False otherwise.
        """
        image = Image.open(image_path)
        width, height = image.size
        is_horizontal = width >= height
        meets_size = width >= min_width and height >= min_height
        if is_horizontal and meets_size:
            if output_folder:
                os.makedirs(output_folder, exist_ok=True)
                dest_path = os.path.join(output_folder, os.path.basename(image_path))
                image.save(dest_path)
            return True
        return False

    def verify_url(self, url):
        """
        Verify a URL for risk.
        Here, we use a simple approach: attempt an HTTP GET request and check the status.
        In production, you might integrate with a threat intelligence API.
        :param url: URL to verify.
        :return: True if URL appears safe (status code 200), False otherwise.
        """
        try:
            response = requests.get(url, timeout=5)
            return response.status_code == 200
        except Exception:
            return False

# Example usage:
if __name__ == "__main__":
    # Initialize processor with path to the EAST model file.
    processor = ImageSEOProcessor(east_model_path="frozen_east_text_detection.pb")
    
    # Remove text from an image
    try:
        img_url = r"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DmKFk4YZ4u5I&psig=AOvVaw34wGcvA5n96Sj-y-2BmD1S&ust=1741634926567000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCLjcrPXd_YsDFQAAAAAdAAAAABAZ"
        processor.remove_text("input_image.jpg", "output_no_text.jpg")
        print("Text removal complete. Saved as output_no_text.jpg")
    except Exception as e:
        print("Error removing text:", e)
    
    # Remove metadata
    processor.remove_metadata("input_image.jpg", "aaaa.jpg")
    print("Metadata removed. Saved as output_no_metadata.jpg")
    
    # Check orientation and size; if conditions met, save image to 'landscape_images' folder
    # if processor.check_orientation_and_size("input_image.jpg", min_width=800, min_height=600, output_folder="landscape_images"):
    #     print("Image meets conditions and has been saved to 'landscape_images'.")
    # else:
    #     print("Image does not meet the required orientation/size.")
    
    # Verify URL safety
    test_url = "https://www.example.com"
    if processor.verify_url(test_url):
        print(f"URL {test_url} appears safe.")
    else:
        print(f"URL {test_url} may be risky.")
