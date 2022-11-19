from application import Dataset, app, User
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from application.forms import LoginForm
from flask_login import login_user, current_user, logout_user, login_required

@app.route('/')
def index():
    # Dataset(name="Hephaestus", description="Hephaestus is a volcano-disaster dataset for semantic segmentation of ground deformation.").save()
    # Dataset(name="Creating xBD", description="xBD is a general-disaster dataset for change detection and damage assessment of buildings.").save()
    datasets=Dataset.objects().all()
    return render_template("dataset.html", datasets=datasets)


@app.route('/login/', methods=('GET', 'POST'))
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
