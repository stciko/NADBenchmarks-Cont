from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import StringField, PasswordField, SubmitField
from application import User


class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])
    submit = SubmitField('Login')

    # def validate_login(self, field):
    #     user = self.get_user()

    #     if user is None:
    #         raise validators.ValidationError('Invalid user')

    #     if not user.get_password(self.password):
    #         raise validators.ValidationError('Invalid password')

    def get_user(self):
        return User.objects(username=self.username).first()


class SubmitForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired()])
    data_source = StringField('data_source', validators=[DataRequired()])
    size = StringField('size', validators=[DataRequired()])
    timespan = StringField('timespan', validators=[DataRequired()])
    geo_coverage = StringField('geo_coverage', validators=[DataRequired()])
    published = StringField('published', validators=[DataRequired()])
    task_type = StringField('task_type', validators=[DataRequired()])
    topics = StringField('topics', validators=[DataRequired()])
    data_type = StringField('data_type', validators=[DataRequired()])
    paper_url = StringField('paper_url', validators=[DataRequired()])
    reference = StringField('reference', validators=[DataRequired()])
    submit = SubmitField('Submit')


        

    