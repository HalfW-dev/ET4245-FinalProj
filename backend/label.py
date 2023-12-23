print("Hello from Python")
import sys
import cv2
import json
import numpy as np
import base64
from PIL import Image

image = np.array(Image.open('./temp.jpg'))
try:
    '''
    imageBase64 = sys.argv[1]
    print(imageBase64 + "--------------ayy")
    imageData = base64.b64decode(imageBase64)

    img_buffer = np.frombuffer(imageData, dtype=np.uint8)
    image = cv2.imdecode(img_buffer, flags=1)
    '''

    predictions = [...]

    with open('./inferredResult.json') as f:
        d = json.load(f)
        predictions = d['predictions']

    for bounding_box in predictions:
        x0 = bounding_box['x'] - bounding_box['width'] / 2
        x1 = bounding_box['x'] + bounding_box['width'] / 2
        y0 = bounding_box['y'] - bounding_box['height'] / 2
        y1 = bounding_box['y'] + bounding_box['height'] / 2
        
        start_point = (int(x0), int(y0))
        end_point = (int(x1), int(y1))
        cv2.rectangle(image, start_point, end_point, color=(0,256,0), thickness=5)
        
        cv2.putText(
            image,
            bounding_box["class"],
            (int(x0), int(y0) - 10),
            fontFace = cv2.FONT_HERSHEY_SIMPLEX,
            fontScale = 1.6,
            color = (255, 255, 255),
            thickness=2
        )

    cv2.imwrite("labeled.jpg", image)
except Exception as e:
    print("Error in Python script:", str(e))