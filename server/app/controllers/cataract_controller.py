# app/controllers/cataract_controller.py
from flask import request, jsonify
from tensorflow import keras
import numpy as np
from PIL import Image
import io
import cv2
from app import app

# Load the cataract model
cataract_model = keras.models.load_model('app/models/cataract.h5')

def predict_cataract(request):
    try:
        input_width, input_height = 224, 224

        # Get the image file from the request
        image = request.files['image']

        # Read the image using OpenCV and preprocess it
        image = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_COLOR)
        image = cv2.resize(image, (input_width, input_height))
        img_array = np.array(image) / 255.0  # Normalize the pixel values

        # Make predictions using the cataract model
        predictions = cataract_model.predict(np.expand_dims(img_array, axis=0))

        return jsonify({'predictions': predictions.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})
