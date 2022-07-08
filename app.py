from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/start")
def hello_world():
    return render_template('start.html')


if __name__ == '__main__' :
    app.run()