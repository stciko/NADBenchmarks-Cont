import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):
    SECRET_KEY=os.environ.get('SECRET_KEY') or b'}\xecUG\x9f\xf9\x18\xfaVQ$k\xf3RJ\xe4'

    MONGODB_SETTINGS = {
        'db': 'NADdatasets',
        'host': os.environ.get('MONGODB_URI')
    }

    S3_BUCKET                 = os.environ.get("S3_BUCKET_NAME")
    S3_KEY                    = os.environ.get("S3_ACCESS_KEY")
    S3_SECRET                 = os.environ.get("S3_SECRET_ACCESS_KEY")
    S3_LOCATION               = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)

    
    MAIL_SERVER=os.environ.get("MAIL_SERVER")
    MAIL_PORT=int(os.environ.get("MAIL_PORT"))
    MAIL_USE_TLS=False
    MAIL_USE_SSL=True
    MAIL_USERNAME=os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD=os.environ.get("MAIL_PASSWORD")
    





