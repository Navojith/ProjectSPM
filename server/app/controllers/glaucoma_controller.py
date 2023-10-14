import cv2
import numpy as np
from keras.models import load_model
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the trained model
model = load_model('app/models/glaucoma_model.h5')


def crop_image_from_gray(img, tol=7):
    if img.ndim == 2:
        mask = img > tol
        return img[np.ix_(mask.any(1), mask.any(0))]
    elif img.ndim == 3:
        gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        mask = gray_img > tol

        check_shape = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))].shape[0]
        if check_shape == 0:
            return img
        else:
            img1 = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))]
            img2 = img[:, :, 1][np.ix_(mask.any(1), mask.any(0))]
            img3 = img[:, :, 2][np.ix_(mask.any(1), mask.any(0))]
            img = np.stack([img1, img2, img3], axis=-1)
        return img

def preprocess_image(image):
    # Preprocess the image directly from the request data
    img = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_COLOR)
    img = crop_image_from_gray(img, tol=7)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    return img


def predict_glaucoma(request):
    try:
        # Get the uploaded image from the request
        uploaded_image = request.files['image']

        if uploaded_image.filename != '':
            # Preprocess the image
            preprocessed_image = preprocess_image(uploaded_image)

            # Make predictions
            prediction = model.predict(np.expand_dims(preprocessed_image, axis=0))
            print(prediction[0][0])
            accuracy = round(prediction[0][0] * 100, 2) 

            # Interpret the prediction
            if accuracy < 50:
                result = "Glaucoma Positive"
                accuracy = 100 - accuracy
            else:
                result = "Glaucoma Negative"

            return jsonify({'result': result, 'accuracy': accuracy})

        else:
            return jsonify({'error': 'No file uploaded'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)