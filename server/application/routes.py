from application import Dataset, app, User
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, Response
from application.forms import LoginForm
from flask_login import login_user, current_user, logout_user, login_required

@app.route('/', methods=['GET'])
def index():
    ### read all the documents and return them in json format
    return jsonify(Dataset.objects().all())

@app.route('/<name_slug>', methods=['GET'])
def get_dataset(name_slug):
    ### read a document and return it in json format
    return jsonify(Dataset.objects(slug=name_slug))


@app.route('/submit', methods=['POST','GET'])
def submit_dataset():
    ### create a new document from the form and save it
    name = request.form.get('name')
    description = request.form.get('description')
    # image TBD
    image_url = request.form.get('image_url')
    data_source = request.form.get('data_source')
    size= request.form.get('size')
    timespan= request.form.get('timespan')
    geo_coverage= request.form.get('geo_coverage')
    published= request.form.get('published')
    task_type = request.form.get('task_type')
    topics = request.form.get('topics')
    data_type= request.form.get('data_type')
    paper_url = request.form.get('paper_url')
    reference = request.form.get('reference')
    # download TBD

    dataset = Dataset(name=name, description=description, image_url=image_url, data_source=data_source, size=size, timespan=timespan, geo_coverage=geo_coverage, published=published, task_type=task_type, topics=topics, data_type=data_type, paper_url=paper_url, reference=reference)
    dataset.save()

    context = {
        'staus': 'Success',
        'dataset': dataset
    }

    return jsonify(context)



    





    


@app.route('/login', methods=('GET', 'POST'))
def login():
    if current_user.is_authenticated:
        return redirect(url_for('login'))
    form = LoginForm()
    if form.validate_on_submit():
        username=form.username.data
        password=form.password.data
        user=User.objects(username=username).first()

        if user:
            if user and user.get_password(password):
                login_user(user, remember=True)
                return redirect("/admin/")
            else:
                flash('Login Unsuccessful. Please check username and password.','danger')
    # if request.method == 'POST' and form.validate():
    #     user = form.get_user()
    #     login_user(user, remember=form.remember.data)
    #     return redirect("/admin/")

    return render_template('login.html', form=form)
