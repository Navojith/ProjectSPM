# app/__init__.py
from flask import Flask

app = Flask(__name__)

# Import routes
from app import routes
