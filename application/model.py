from enum import unique
from application import db

class Dataset(db.Document):
    name = db.StringField(required=True, unique=True)
    description = db.StringField(required=True)
    