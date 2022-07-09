from flask import Flask,render_template,request,jsonify,url_for

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


@app.route('/_add_numbers')
def add_numbers():
    a = request.args.get('a', 0)
    b = request.args.get('b', 0)
    return jsonify(result=a + b)

@app.route('/words')
def turnwords():
    a = request.args.get('a')
    url_img = url_for('static', filename='images/algeriaflag.jpg')
    print("bella bella")
    print(url_img)
    return jsonify(result=url_img)

if __name__ == '__main__' :
    app.run()