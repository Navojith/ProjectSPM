from flask import Flask,request, render_template, jsonify
import torch
# import torchvision
import torchvision.transforms as transforms
import numpy as np
import cv2
# from PIL import Image
import torch.nn as nn
# import torchvision.models as models
# import io

app = Flask(__name__)

model = torch.hub.load("ultralytics/yolov5", "custom" , path='app\models\detection.pt')

def detect_fundus(request):

    try:
        # Get the image file from the request
        image = request.files['image'].read()

        # Perform preprocessing on the image
        image = cv2.imdecode(np.fromstring(image, np.uint8), cv2.IMREAD_COLOR)  # Convert bytes to image

        #perform inference      
        result = model(image) 

        # Initialize variables to keep track of whether any detection meets the threshold
        is_fundus = False
        # max_confidence = 0.0    

        # Iterate through the detections
        for detection in result.pred[0]:
            confidence = detection[4]  
            print(confidence)
            if confidence >= 0.83:
                is_fundus =  True

        return jsonify({'is_fundus': is_fundus})
        
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})