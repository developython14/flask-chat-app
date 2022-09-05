from flask import Flask,render_template,request,jsonify,url_for,redirect,session
from math import * 
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from cryptography.fernet import Fernet
from flask_socketio import SocketIO



app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)



@app.route("/")
def start():
    return 'you are welecme bro'

if __name__ == '__main__':
    socketio.run(app)