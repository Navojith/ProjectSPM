from flask import jsonify
from tensorflow import keras
import cv2
import numpy as np
from efficientnet.tfkeras import EfficientNetB4
from PIL import Image


DR_model = keras.models.load_model('app/models/diabeticRetinopathy.h5')

def predict_DR(request):
    input_width, input_height = 224, 224

    try:
        image = request.files['image']
        image = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_COLOR)
        # image = Image.open(image)
        image = cv2.resize(image, (input_width, input_height))
        image_arr = np.array(image) / 255.0
        # print(image_arr.shape)
        image_arr = image_arr[np.newaxis, ...]
        # print(image_arr.shape)
    
        predictions = DR_model.predict(image_arr)

        print(np.argmax(predictions))

        if(np.argmax(predictions) == 0 ):
            result = "Mild Diabetic Retinopathy"
        elif(np.argmax(predictions) == 1 ):
            result = "Moderate Diabetic Retinopathy"
        elif(np.argmax(predictions) == 2 ):
            result = "No Diabetic Retinopathy"
        elif(np.argmax(predictions) == 3 ):
            result = "Proliferative Diabetic Retinopathy"
        else:
            result = "Severe Diabetic Retinopathy"

        return jsonify({'predictions': result, 'confidence': str(np.max(predictions))})
        # return jsonify({'predictions': img_array})
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})