from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello tomahook!</p>"


@app.route("/filter_api")
def filter_api():
    return render_template('filter_api.html')


@app.route("/filter_with_ajax")
def filter_with_ajax():
    return render_template('filter_with_ajax.html')


if __name__ == '__main__' :
    app.run()