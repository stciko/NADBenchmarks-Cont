from application import Dataset, app, User, s3, Feedback
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, Response, session
from application.forms import LoginForm
from flask_login import login_user, current_user, logout_user, login_required
from werkzeug.utils import secure_filename
from mongoengine.queryset.visitor import Q
from flask_cors import cross_origin
from slugify import slugify

@app.route('/', methods=['GET'])
@cross_origin()
def index():
    # home page
    # return all accepted datasets
    # user=User(username='admin', password='nadbenchmarks2412')
    # user.save()
    return render_template('index.html')
    # return render_template('test_s3.html')

@app.route('/datasetList', methods=['GET'])
@cross_origin()
def getDatasetList():
    return jsonify(Dataset.objects(approved=True))


@app.route('/<name_slug>', methods=['GET'])
@cross_origin()
def get_dataset(name_slug):
    # specific dataset page
    # get the dataset object by name_slug and get all the similar datasets by topic and task_type
    obj=Dataset.objects(Q(slug=name_slug) & Q(approved=True)).first()
    if obj:
        by_topic=Dataset.objects(Q(topic=obj.topic) & Q(approved=True) & Q(slug__ne=name_slug))
        by_task_type=set()
        for task in obj.task_type:
            by_task_type.update(Dataset.objects(Q(task_type=task) & Q(approved=True) & Q(slug__ne=name_slug)))
        context={
            'found':True,
            'dataset': obj,
            'by_topic': by_topic,
            'by_task_type': list(by_task_type)
        }
    else:
        context={
            'found':False
        }
    return jsonify(context)



@app.route('/submit/dataset', methods=['POST'])
@cross_origin()
def submit_dataset():
    content=request.json
    if content:
        name=content['datasetName']
        if Dataset.objects(name=name).first():
            return jsonify({'success':False, 'error':'Dataset with this name already exists.'})
        description=content['description']
        reference=content['citation']
        topic=content['topic']
        task_type=content['mlTaskType']
        data_type=content['datasetType']
        timespan=content['timespan']
        geo_coverage=content['coverage']
        paper_url=content['resourceLink']
        dataset_url=content['datasetSource']
        phases=content['phase']
        file=content['datasetFile']
        file_url=''
        if file:
            file.filename = secure_filename(slugify(name) + '.' + file.filename.split('.')[-1])
            output = upload_file_to_s3(file, 'file/', app.config["S3_BUCKET"])
            file_url = 'https://s3.amazonaws.com/nadbenchmarks/file/' + file.filename
        dataset=Dataset(name=name, description=description, reference=reference, topic=topic, task_type=task_type, data_type=data_type, timespan=timespan, geo_coverage=geo_coverage, paper_url=paper_url, dataset_url=dataset_url, phases=phases, file_url=file_url)
        dataset.save()
        return jsonify({'success':True})
    return jsonify({'success':False, 'error':'No data found.'})



@app.route('/submit/contact',methods=['POST'])
@cross_origin()
def contact_submit():
    content=request.json
    if content:
        name=content['name']
        email=content['email']
        message=content['message']
        subject=content['subject']
        feedback=Feedback(first_name=name, email=email, message=message, subject=subject)
        feedback.save()
        return jsonify({'success':True})
    else:
        return jsonify({'success':False})



# @app.route('/upload',methods=['POST'])
# def tests3():
#     obj=Dataset.objects.get(slug='vidi-a-video-dataset-of-incidents')
#     if request.method == "POST":
#         file = request.files['file']
#         file.filename = secure_filename(obj.name + '.' + file.filename.split('.')[-1])
#         # file.filename = secure_filename('numerical' + '.' + file.filename.split('.')[-1])
#         output = upload_file_to_s3(file, 'cover_img/', app.config["S3_BUCKET"])
#         return redirect("/")







@app.route('/admin/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    if current_user.is_authenticated:
        return redirect('/admin')
    form = LoginForm()
    if form.validate_on_submit():
        username=form.username.data
        password=form.password.data
        user=User.objects.get(pk=username)
        print(user)
        if user:
            if user and user.get_password(password):
                login_user(user)
                next = request.args.get('next')
                return redirect(next or '/admin')
            else:
                flash('Login Unsuccessful. Please check username and password.','danger')

    return render_template('login.html', form=form)


@app.route('/admin/logout')
def logout():
    logout_user()
    return redirect('/admin/')




def upload_file_to_s3(file, path, bucket_name, acl="public-read"):
    """
    Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html
    """
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            path+file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type    #Set appropriate content type as per the file
            }
        )
    except Exception as e:
        print("Something Happened: ", e)
        return e
    return "{}{}".format(app.config["S3_LOCATION"], file.filename)