from tokenize import Double
from flask import Flask,render_template,request,jsonify,url_for
from flask_socketio import SocketIO
from math import * 


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route("/")
def hello_world():
    return "<p>Hello tomahook!</p>"


@app.route("/chat")
def chat():
    return render_template('chat.html')


@app.route("/filter_api")
def filter_api():
    return render_template('filter_api.html')


@app.route("/filter_with_ajax")
def filter_with_ajax():
    return render_template('filter_with_ajax.html')


@app.route('/_add_numbers')
def add_numbers():
    a = request.args.get('a', 0 ,type=int)
    a = factorial(a)
    return jsonify(result=a)

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)

@socketio.on('messagebox')
def handle_my_custom_event(msg, methods=['GET', 'POST']):
    print('received messages: ' + str(msg))
    socketio.emit('message draw', msg, callback=messageReceived)


if __name__ == '__main__' :
    socketio.run(app)
