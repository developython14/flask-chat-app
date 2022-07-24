from tokenize import Double
from bson import ObjectId
from flask import Flask,render_template,request,jsonify,url_for,redirect,session
from flask_socketio import SocketIO
from math import * 
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from cryptography.fernet import Fernet

key = Fernet.generate_key()
f = Fernet(key)





app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
bcrypt = Bcrypt(app)
socketio = SocketIO(app)
app.config["MONGO_URI"] = "mongodb+srv://mustapha31:L01FRcNEVjpBtfGd@cluster0.oz4o7.mongodb.net/mustapha?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
db = mongodb_client.db
db.messages.delete_many({})