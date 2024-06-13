from flask import request, jsonify
import torch
import torch.nn as nn
import numpy as np
from efficientnet_pytorch import EfficientNet
from torchvision import transforms
import cv2
from PIL import Image
import os
import tempfile

train_on_gpu = torch.cuda.is_available()
if not train_on_gpu:
    print('CUDA is not available. Training on CPU...')
    device = torch.device('cpu')
    map_location='cpu'
else:
    print('CUDA is available. Training on GPU...')
    device = torch.device('cuda:0')
    map_location=lambda storage, loc: storage.cuda()

model = EfficientNet.from_name('efficientnet-b7')
model._fc = nn.Linear(model._fc.in_features, 5)
for param in model.parameters():
            param.requires_grad = False
model = model.to(device)

model.load_state_dict(torch.load("app/models/model_enet_b7.bin", map_location=map_location))

model.eval()

def predict_DR(request):
    image_size = 256
    sigmaX = 10

    try:
        uploaded_file = request.files['image']
        temp_dir = tempfile.mkdtemp()
        temp_file_path = os.path.join(temp_dir, uploaded_file.filename)
        uploaded_file.save(temp_file_path)

        image = cv2.imread(temp_file_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # resize and color
        image = cv2.resize(image, (int(image_size), int(image_size)))
        image = cv2.addWeighted(image, 4, cv2.GaussianBlur(image, (0, 0), sigmaX), -4, 128)


        # convert to tensor    
        image = torch.tensor(image)
        image = image.permute(2, 1, 0)

        transform = transforms.Compose([transforms.ToPILImage(),
                                  transforms.ToTensor(),
                                 ])
        
        image = transform(image)

        with torch.set_grad_enabled(False):
            preds = model(image.unsqueeze(0)).detach().cpu().numpy()
            preds_round = preds.argmax()

            if preds_round == 0:
                prediction = "No Diabetic Retinopathy"
            elif preds_round == 1:
                prediction = "Mild Diabetic Retinopathy"
            elif preds_round == 2:
                prediction = "Moderate Diabetic Retinopathy"
            elif preds_round == 3:
                prediction = "Severe Diabetic Retinopathy"
            elif preds_round == 4:
                prediction = "Proliferate Diabetic Retinopathy"

        return jsonify({'predictions': prediction})
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})
    
