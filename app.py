from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello Mustapha!</p>"


@app.route("/filter_api")
def filter_api():
    return render_template('filter_api.html')


if __name__ == '__main__' :
    app.run()