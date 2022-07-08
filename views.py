@app.route("/<user>")
def hello_world(user):
    if 'toma' in session : 
        session['toma']  = session.get('toma') + 1
    else : 
        session['toma'] = 1
    resp = make_response(render_template('index.html'))
    resp.set_cookie('username', 'elmoustapha')
    y = request.cookies.get('username')
    name = list_of_user[user]['name']
    age = list_of_user[user]['age']
    location = list_of_user[user]['location']
    username = user+'.jpg'
    x = session.get('toma')
    return render_template('index.html',name=name , age= age , location = location ,username =username , y=x)

@app.route("/login" ,methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = loginform()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.name.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html' ,form = form)

@app.route('/home')
def home():
    mail = Mail()
    msg = Message("Hello",
                  sender="khasarou@gmail.com",
                  recipients=["tabouk780@gmail.com"])
    with app.open_resource("./static/moh.jpg") as fp:
        msg.attach("moh.jpg", "image/jpg", fp.read())
    msg.body = "mustapha"
    msg.html = 'i m mustapha from quicko kifach yassine rak mlih ya speed https://developython14.github.io/my_third_design/'
    mail.send(msg)
    return render_template('home.html')

@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return 'ya  kho rah  kayn un probleme ' 

@app.route("/signup",methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = signupform()
    if form.validate_on_submit():
        username = form.name.data
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        email = form.email.data
        date_of_birth = form.date_of_birth.data +str(' 01:55:19')
        date_time_obj = datetime.strptime(date_of_birth, '%d/%m/%y %H:%M:%S')
        math = form.checkbox_math.data
        physique = form.checkbox_phy.data
        men = form.checkbox_men.data
        women = form.checkbox_women.data
        ecole  = request.form.get("level")
        admin = User(username=username, email=email,password = hashed_password ,date_of_birth =date_time_obj ,physique = physique ,math = math ,men = men ,women = women ,ecole = ecole) 
        db.session.add(admin)
        db.session.commit()
        f = request.files['file']
        filename = secure_filename(username+'.jpg')
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect('/profile')
    return render_template('signup1.html',form = form)



@app.route("/profile")
@login_required
def profile():
    User = current_user
    name = User.username
    age = User.math
    location = User.ecole
    username = User.username+'.jpg'
    return render_template('index.html',name=name , age= age , location = location ,username =username )



@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect('/login')

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' in request.files :
            f = request.files['file']
            filename = secure_filename(f.filename)
            f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect('/moh')
        else:
            return redirect('/moh')
    return render_template('signup.html')


@app.route('/question/<user>' ,methods=['GET', 'POST'])
def toma(user) :
    s = 0
    question = question.query.filter_by(id=int(user)).first()
    list_choix = [question.first_answer ,question.second_answer,question.third_answer,question.fourth_answer ]
    if request.method == 'POST':
        x = request.form.get("mustapha")
        user = current_user
        my = quizz(name = x)
        db.session.add(my)
        db.session.commit()
        return redirect('/question/'+str(int(user)+1) )
    return render_template('tom.html' ,question = question.name , choix=list_choix , x=s )

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
