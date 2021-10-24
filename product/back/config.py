import sys
import os
from pathlib import Path

# To generate a new secret key:
# >>> import random, string
# >>> "".join([random.choice(string.printable) for _ in range(24)])
SECRET_KEY = "ZJ58214°xK%7C]\th-{%=iOzAEv-"


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
sys.path.append(os.path.dirname(BASE_DIR))
# DIR = Path(__file__).resolve().parent
DIR = 'database'
DATABASE = os.path.join(BASE_DIR, DIR, 'BLAblaPp.db')


UPLOAD_FOLDER = 'public/uploads'
UPLOAD_FOLDER_PARENT = 'public'

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

RESIZE_ROOT = os.path.join(BASE_DIR, UPLOAD_FOLDER)
RESIZE_URL  = os.path.join(BASE_DIR, UPLOAD_FOLDER) # URL parce que ça gere aussi S3 mais la c'est le nom du nouveau fichier
RESIZE_CACHE_STORE = "noop"
