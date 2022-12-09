from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from application.config import Config
from flask_mongoengine import MongoEngine
from flask_admin import Admin, expose, AdminIndexView
from flask_admin.contrib.mongoengine import ModelView
from slugify import slugify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user, login_required,  LoginManager
import boto3
import datetime
from flask_admin.helpers import get_form_data
from flask_admin.babel import gettext
from flask_admin.form import rules
from flask_mail import Mail, Message
from flask_admin.menu import MenuLink
from markupsafe import Markup
from flask_cors import CORS, cross_origin


try:
    from flask_restplus import Api, Resource
except ImportError:
    import werkzeug, flask.scaffold
    werkzeug.cached_property = werkzeug.utils.cached_property
    flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func
    from flask_restplus import Api, Resource



api=Api()
app=Flask(__name__, static_folder='../../client/build', static_url_path='/')
app.config.from_object(Config)

db=MongoEngine()
db.init_app(app)
# api.init_app(app)

s3 = boto3.client(
   "s3",
   aws_access_key_id=app.config['S3_KEY'],
   aws_secret_access_key=app.config['S3_SECRET']
)

print(app.config)
mail = Mail(app)
cors=CORS(app)

### Dataset Model
class Dataset(db.Document):
    name = db.StringField(required=True, unique=True)  # name of the dataset
    slug = db.StringField( unique=True)  # slug field for url generation
    data_type = db.StringField()  # type of data  e.g. image, text, audio, video, numerical, etc.
    phases = db.StringField() # phases of the dataset  e.g. prevention, response, recovery, etc.
    description = db.StringField()  # description of the dataset
    image_url = db.StringField()  # image url for the dataset
    data_source = db.StringField()   # data source of the dataset
    size= db.StringField()      # size of the dataset
    timespan= db.StringField()   # timespan of the dataset
    geo_coverage= db.StringField()   # geographical coverage
    published= db.StringField()   # published date
    task_type = db.ListField(db.StringField()) # ML task type (regression, classification, segmentation, detection, etc.)
    task_type_str=db.StringField()  # string representation of the task type
    topic = db.StringField()  # topic (natrual disaster, climate change, etc.)
    evaluated_on = db.ListField(db.StringField())  # evaluated on (e.g. COCO, VOC, etc.)
    metrics = db.ListField(db.StringField())  # metrics (e.g. accuracy, precision, recall, etc.)
    results = db.StringField() # MAE, RMSE, etc.
    paper_url = db.StringField()   # link to the source paper
    dataset_url = db.StringField()  # link to the dataset
    reference = db.StringField()   # reference
    file_url = db.StringField()  # link to the file
    approved = db.BooleanField(default=False)  # approval status


    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        self.task_type_str = ' | '.join(self.task_type)
        super(Dataset, self).save(*args, **kwargs)


# Feedback Model
class Feedback(db.Document):
    first_name = db.StringField(required=True)
    last_name = db.StringField()
    email = db.StringField(required=True)  # email of the user
    subject = db.StringField()  # subject of the feedback
    message = db.StringField(required=True)  # message from the user
    timestamp = db.DateTimeField()  # timestamp of the feedback
    response = db.StringField()  # response from the admin
    replied = db.BooleanField(default=False)  # status of the feedback (replied or not)

    def save(self, *args, **kwargs):
        self.timestamp = datetime.datetime.now()
        super(Feedback, self).save(*args, **kwargs)



# Admin
class User(db.Document):
    username = db.StringField(primary_key=True)
    password = db.StringField()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def get_password(self, password):
        return check_password_hash(self.password, password)

    def save(self, *args, **kwargs):
        self.set_password(self.password)
        super(User, self).save(*args, **kwargs)

    # Flask-Login integration
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    # Required for administrative interface
    def __unicode__(self):
        return self.id




# Initialize flask-login
def init_login():
    login_manager = LoginManager()
    login_manager.init_app(app)

    # Create user loader function
    @login_manager.user_loader
    def load_user(username):
        user=User.objects(username=username).first()
        print(user)
        return user


# Create customized model view class
class MyModelView(ModelView):
    column_exclude_list = ['slug','task_type_str']
    column_searchable_list = ('name', 'description', 'reference','published')
    column_filters = ('name', 'topic', 'data_type', 'published','approved')



    def is_accessible(self):
        return current_user.is_authenticated
    # def _handle_view(self, name, **kwargs):
    #     if not self.is_accessible():
    #         return redirect(url_for('login'))
    def inaccessible_callback(self, name, **kwargs):
        # redirect to login page if user doesn't have access
        return redirect(url_for('login'))

class FeedbackView(MyModelView):
    can_create = False
    column_list = ('timestamp','first_name', 'last_name', 'email', 'subject', 'message', 'response', 'Send Reply')
    column_searchable_list = ['first_name', 'last_name', 'email', 'subject', 'message', 'response']
    column_filters = ['first_name', 'last_name', 'email', 'subject', 'message', 'response', 'timestamp', ]
    column_labels = dict(timestamp='Time', first_name='First Name', last_name='Last Name', email='Email', subject='Subject', message='Message', response='Response' )


    form_widget_args = {
        'timestamp':{
            'readonly':True
        },
        'first_name':{
            'readonly':True
        },
        'last_name':{
            'readonly':True
        },
        'email':{
            'readonly':True
        },
        'subject':{
            'readonly':True
        },
        'message':{
            'readonly':True
        },


    }

    form_edit_rules =(
        rules.Field('timestamp'),
        rules.Field('first_name'),
        rules.Field('last_name'),
        rules.Field('email'),
        rules.Field('subject'),
        rules.Field('message'),
        rules.Field('response'),
    )

    def on_form_prefill(self, form, id):
        form.response.render_kw = {'readonly': True} if Feedback.objects(id=id).first().replied else {}

    def _format_send_response(view, context, model, name):
        if model.replied:
            return 'Replied'

        reply_url = url_for('.reply')
        _html = '''
            <form action="{reply_url}" method="POST">
                <input id="feeddack_id" name="feeddack_id"  type="hidden" value="{feeddack_id}">
                <input id="response" name="response"  type="hidden" value="{feeddack_response}">
                <button type='submit'>Send</button>
            </form
        '''.format(reply_url=reply_url, feeddack_id=model.id, feeddack_response=model.response)
        return Markup(_html)


    column_formatters = {
        'Send Reply': _format_send_response
    }


    @expose('reply', methods=['POST'])
    def reply(self):
        form = get_form_data()
        if not form:
            flash(gettext('Could not get form from request.'), 'error')
            return redirect('/admin/feedback')
        model = self.get_one(form['feeddack_id'])
        if not model:
            flash(gettext('Dataset does not exist.'), 'error')
            return redirect('/admin/feedback')
        response = form['response']
        if not response:
            flash(gettext('Response is required.'), 'error')
        else:
            msg = Message(f'Re: {model.subject}', sender = app.config['MAIL_USERNAME'], recipients = [model.email])
            msg.body = response
            mail.send(msg)
            model.replied = True
            model.save()
            flash(gettext('Response sent.'), 'success')
        return redirect('/admin/feedback')

    def is_accessible(self):
        return current_user.is_authenticated
    # def _handle_view(self, name, **kwargs):
    #     if not self.is_accessible():
    #         return redirect(url_for('login'))
    def inaccessible_callback(self, name, **kwargs):
        # redirect to login page if user doesn't have access
        return redirect(url_for('login'))


class LoginMenuLink(MenuLink):

    def is_accessible(self):
        return not current_user.is_authenticated


class LogoutMenuLink(MenuLink):

    def is_accessible(self):
        return current_user.is_authenticated




init_login()
admin = Admin(app, name='NADBenchmarks', template_mode="bootstrap3")
admin.add_view(MyModelView(Dataset))
admin.add_view(FeedbackView(Feedback))
admin.add_link(LogoutMenuLink(name='Logout', category='', url='/admin/logout'))
admin.add_link(LoginMenuLink(name='Login', category='', url='/admin/login'))

from application import routes
