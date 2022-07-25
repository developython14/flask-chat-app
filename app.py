from argparse import Namespace
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


@app.route("/chat/u/<hash>")
def hello_world(hash):
    last_messages = db.messages.find({'roomname':hash})
    last_messages = list(last_messages)
    userid =  int(session['userid'])
    return render_template('testing.html' , userid = userid,last_messages =last_messages )

@app.route("/chat/<username>")
def secretdiss(username):
    user_id = session['userid']
    ref  =list(sorted([user_id,username]))
    hashed = db.rooms.find({'users_id': ref})
    if len(list(hashed))==0:
        db.rooms.insert_one({'users_id':ref})
        hashed = db.rooms.find({'users_id': ref})
        hashed = list(hashed)[0]['_id']
        hashed = str(hashed)
        return redirect( url_for('hello_world',hash =hashed))
    else : 
        hashed = db.rooms.find({'users_id': ref})
        hashed = list(hashed)[0]['_id']
        hashed = str(hashed)
        return redirect( url_for('hello_world',hash =hashed))


@app.route("/introscreen" ,methods=['GET', 'POST'] )
def introscreen():
    if request.method == 'POST':
        print("bien directed")
        session['username'] = request.form['Username']
        session['userid'] = request.form['UsernameId']
        session['image_url'] = request.form['image_url']
        return redirect('/chat')
    elif request.method == 'GET':
        return render_template('intro_screen.html')

@app.route("/chat" ,methods=['GET', 'POST'] )
def chat():
    if request.method == 'GET':
        return render_template('chat.html')


@app.route("/filter_api")
def filter_api():
    return render_template('filter_api.html')


@app.route("/filter_with_ajax")
def filter_with_ajax():
    return render_template('filter_with_ajax.html')



def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('my event' )
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print("message recived by backend" , json)
    db.messages.insert_one(json)
    json['_id'] = str(json['_id'])
    socketio.emit('my response', json, callback=messageReceived) 

@socketio.on('connection')
def handle_my_custom_event_connect(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('userconnect', json, callback=messageReceived)

@socketio.on('connection')
def handle_my_custom_event_connect(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('userconnect', json, callback=messageReceived)


if __name__ == '__main__' :
    socketio.run(app)
