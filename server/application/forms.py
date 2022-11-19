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

        

    