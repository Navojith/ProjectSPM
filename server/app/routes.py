# app/routes.py
from flask import request, jsonify
from app import app
from app.controllers import cataract_controller
from app.controllers import glaucoma_controller
from app.controllers import diabeticRetinopathy_controller
from app.controllers import detection_controller
from app.controllers import DR_controllerV2

@app.route('/')
def index():
    return 'CNN Model Prediction App'


@app.route('/predict/cataract', methods=['POST'])
def predict_cataract():
    return cataract_controller.predict_cataract(request)

@app.route('/predict/glaucoma', methods=['POST'])
def predict_glaucoma():
    return glaucoma_controller.predict_glaucoma(request)

@app.route('/predict/dr', methods=['POST'])
def predict_DR():
    return diabeticRetinopathy_controller.predict_DR(request)

@app.route('/detect/fundus',methods=['POST'])
def detect_fundus():
    return  detection_controller.detect_fundus(request)

@app.route('/predict/dr2', methods=['POST'])
def predict_DR2():
    return DR_controllerV2.predict_DR(request)
