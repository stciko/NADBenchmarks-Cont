from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from application.config import Config
from flask_mongoengine import MongoEngine
from flask_admin import Admin
from flask_admin.contrib.mongoengine import ModelView
from slugify import slugify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user, login_required,  LoginManager


try: 
    from flask_restplus import Api, Resource
except ImportError:
    import werkzeug, flask.scaffold
    werkzeug.cached_property = werkzeug.utils.cached_property
    flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func
    from flask_restplus import Api, Resource



api=Api()

app=Flask(__name__)
app.config.from_object(Config)

db=MongoEngine()
db.init_app(app)
# api.init_app(app)

### Dataset Model
class Dataset(db.Document):
    name = db.StringField(required=True, unique=True)  # name of the dataset
    slug = db.StringField( unique=True)  # slug field for url generation
    description = db.StringField(required=True)  # description of the dataset
    image_url = db.StringField(required=True)  # image url for the dataset
    data_source = db.StringField(required=True)   # data source of the dataset
    size= db.StringField(required=True)      # size of the dataset
    timespan= db.StringField(required=True)   # timespan of the dataset
    geo_coverage= db.StringField(required=True)   # geographical coverage
    published= db.StringField(required=True)   # published date
    task_type = db.ListField(db.StringField()) # ML task type (regression, classification, segmentation, detection, etc.)
    topics = db.ListField(db.StringField())   # topics (natrual disaster, climate change, etc.)
    data_type= db.StringField(required=True)   # data type (image, text, etc.)
    paper_url = db.StringField(required=True)   # link to the source paper
    reference = db.StringField(required=True)   # reference
    # download instruction? download link? a link to the dataset page? 
    

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Dataset, self).save(*args, **kwargs)

# Admin
class User(db.Document):
    username = db.StringField(required=True, unique=True)
    password = db.StringField()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def get_password(self, password):
        return check_password_hash(self.password, password)

    # Flask-Login integration
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

    # Required for administrative interface
    def __unicode__(self):
        return self.login




# Initialize flask-login
def init_login():
    login_manager = LoginManager()
    login_manager.init_app(app)

    # Create user loader function
    @login_manager.user_loader
    def load_user(user_id):
        return User.objects(id=user_id).first()


# Create customized model view class
class MyModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated
    def _handle_view(self, name, **kwargs):
        if not self.is_accessible():
            return redirect(url_for('login'))



init_login()
admin = Admin(app, name='NADBenchmarks')
admin.add_view(MyModelView(Dataset))

from application import routes




