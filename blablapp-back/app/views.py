import os
import datetime
import hashlib

from flask import jsonify, Flask, render_template, request, redirect, url_for, send_from_directory, session, abort, Markup, make_response
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
CORS(app)
app.config.from_object('config')

from .models import query_db, execute_db

from io import BytesIO

def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def connected_user():
    if session['user']:
        return session['user']


@app.route('/public/uploads/<filename>')
def send_file(filename):
    return send_from_directory('../' + app.config['UPLOAD_FOLDER'], filename)


@app.context_processor
def inject_categories_for_all_templates():
    return {
        'categories': query_db("select * from categories"),
        'post_form': session.pop('add-post-errors', None),
        'current_category': request.args.get('category', None),
    }


@app.template_filter('strftime')
def _jinja2_filter_datetime(date, fmt='%d/%m/%Y at %H:%M:%S'):
    date = datetime.datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
    date += datetime.timedelta(hours=1) # Gestion du timezone
    return datetime.datetime.strftime(date, fmt)


@app.route('/register', methods=['POST'])
def register():  
# inscrire un utilisateur dans la base de données,
# avec les données postées (form): username, email et password
# si l'enregistrement marche : connecter l’utilisateur et
# renvoyer (json) {registered : true} 
# sinon : renvoyer (json) {registered : false}
    postdata = request.form.to_dict()
    result = dict(registered='')
    if not session.get('user') and postdata:
        if postdata.get('username') and postdata.get('password') and postdata.get('email'):
            username = postdata['username']
            email = postdata['email']
            password = postdata['password']
            existing_user = query_db("""SELECT id FROM user WHERE username = (?) or email = (?)""", (username, email))
            if existing_user:
                # si le nom d'utilisateur ou le mot de passe existe déjà on renvoie un message ?
                print("route/register/existing_user")
                result = dict(registered='existing_user')
                print('route/register/existing_user/result', result)
            else:
                # sinon : enregistrer le nouvel utilisateur
                # si l'enregistrement marche : connecter l’utilisateur
                session['user'] = execute_db("insert into user (username, email, password) \
                                   values (?, ?, ?);", 
                                   (username, email, hashlib.sha256(password.encode()).hexdigest()))
                if session['user']:    
                    result = dict(registered = True)
                    print('route/register/new_user/result/registered/True', result)
                else:
                    result = dict(registered = False)
                    print('route/register/new_user/result/registered/False', result)
            # renvoyer (json)
            return jsonify(result)
# Test Flask:                       
# curl -d "username=Michel&password=Michel&email=Michel@blablapp.com" -X POST http://127.0.0.1:5000/register
# {"registered":"existing_user"}
# curl -d "username=Michel&password=Michel&email=TOto@blablapp.com" -X POST http://127.0.0.1:5000/register
# {"registered":"existing_user"}
# curl -d "username=TOto&password=Michel&email=Michel@blablapp.com" -X POST http://127.0.0.1:5000/register
# {"registered":"existing_user"}
# curl -d "username=TOto&password=TOto&email=TOto@blablapp.com" -X POST http://127.0.0.1:5000/register
# {"registered":"True"}
# curl -d "username=TOto&password=TOto&email=Pierre@blablapp.com" -X POST http://127.0.0.1:5000/register
# {"registered":"existing_user"}
# curl -d "username=Pierre&password=Pierre&email=Pierre@blablapp.com" -X POST http://127.0.0.1:5000/register
# {"registered":"True"}

@app.route("/")
def hello():
    return ("hello world!")


@app.route("/login", methods=['POST'])
def login():
    postdata = request.form
    if postdata.get('username') and postdata.get('password'):
        username = postdata.get('username')
        password = hashlib.sha256(postdata.get('password').encode()).hexdigest()

        # db = get_db()
        # cursor = db.cursor()
        existing_user = query_db("""SELECT id FROM user WHERE username = (?) and password = (?)""", (username, password))
        for user in existing_user:
            existing_user_id = user[0]
        # res = cursor.fetchone()
        if existing_user_id:
            session['user'] = existing_user_id
            return "{logged_in : true}"
        else:
            return "{logged_in : false}"

# curl -d "username=Michel&password=Michel" -X POST http://127.0.0.1:5000/login -c cookies.txt

    

@app.route("/logout")
def logout(): # déconnecte l'utilisateur
# en cas de succès, renvoie un dictionnaire {disconnected : true}
# en cas d'échec, renvoie un dictionnaire {disconnected : false}
    # print(session['user'])
    # return (session['user'])
    if session.get('user'):
        print(session['user'])
        for key in list(session.keys()):
            session.pop(key)
        return '{"disconnected" : true}'
    else:
        return '{"disconnected" : false}'

# curl http://127.0.0.1:5000/logout -b cookies.txt


# @app.route('/pictures')
# def index():
#     if 'category' in request.args:
#         pictures = query_db(f"""select *, avg(votes.value) as vote, count(votes.value) as total_vote, categories.name as cat_name
#         from pictures
#         inner join categories on category_id = categories.id
#         left join votes on votes.picture_id = pictures.id
#         where categories.name = ?
#         group by pictures.id
#         order by id desc;""", (request.args['category'],))
#     else:
#         pictures = query_db(f"""select *, avg(votes.value) as vote, count(votes.value) as total_vote, categories.name as cat_name
#         from pictures
#         inner join categories on category_id = categories.id
#         left join votes on votes.picture_id = pictures.id
#         group by pictures.id
#         order by id desc;""")
#     # return render_template('index.html', pictures=pictures)
#     categories = query_db("select * from categories")
#     print({'pictures': [dict(row) for row in pictures], 'categories': [dict(row) for row in categories]})
#     return jsonify({'pictures': [dict(row) for row in pictures], 'categories': [dict(row) for row in categories]})


# @app.route('/pictures/<id>')
# def show(id):
#     print('show(id)', id)
#     picture = query_db("""select *, avg(votes.value) as vote, count(votes.value) as total_vote, categories.name as cat_name
#         from pictures
#         inner join categories on pictures.category_id = categories.id
#         left join votes on votes.picture_id = pictures.id
#         where pictures.id = ?
#         group by pictures.id;""", (id,), one=True)
#     if picture is None:
#         abort(404)
#     comments = query_db("""select * from comments where picture_id = ?;""", (id,))
#     # return render_template('show.html', picture=picture, comments=comments)
    
#     print('/pictures/<id>', {'picture': dict(picture) , 'comments': [dict(row) for row in comments]})
#     return jsonify({'picture': dict(picture), 'comments': [dict(row) for row in comments]})


# @app.route('/uploadd', methods=['POST'])
# def fileUpload():
#     target=os.path.join(app.config['UPLOAD_FOLDER_PARENT'], 'uploads')
#     if not os.path.isdir(target):
#         os.mkdir(target)
#     file = request.files['file']
#     filename = secure_filename(file.filename)
#     destination="/".join([target, filename])
#     file.save(destination)
#     session['uploadFilePath']=destination
#     return jsonify(destination)


# @app.route('/uploaddtext', methods=['POST'])
# def fileUploadtext():
#     text = request.form.to_dict()
#     title = text['imageNAME']
#     path = text['imagePATH']
#     upload_date = text['imageDATE']
#     category_id = text['imageCAT']
#     comment = text['imageCOMMENT']
#     execute_db("insert into pictures (title, path, upload_date, category_id, comment) values (?, ?, ?, ?, ?);", (title, path, upload_date, category_id, comment))
#     return jsonify(text)


# @app.route('/pictures/<picture_id>/comments', methods=['GET', 'POST'])
# def post_comment(picture_id):
#     picture = query_db("select *, categories.name as cat_name from pictures inner join categories on category_id = categories.id where pictures.id = ?;", (picture_id,), one=True)
#     if picture is None:
#         abort(404)

#     author = request.form['author']
#     content = request.form['content']
#     if author and content:
#         execute_db("insert into comments (author, content, picture_id) values (?, ?, ?);", (author, content, picture_id))

#         return redirect(f"/pictures/{picture_id}")
#     else:
#         comments = query_db("select * from comments where picture_id = ?;", (picture_id,))
#         # return render_template('show.html', picture=picture, comments=comments, comment_form=request.form)
#         print({'picture': [dict(row) for row in pictures], 'comments': [dict(row) for row in comments], 'comment_form': [dict(row) for row in request.form]})
#         return jsonify({'picture': [dict(row) for row in pictures], 'comments': [dict(row) for row in comments], 'comment_form': [dict(row) for row in request.form]})


# @app.route('/pictures/<picture_id>/votes', methods=['GET', 'POST'])
# def post_votes(picture_id):
#     picture = query_db("select *, categories.name as cat_name from pictures inner join categories on category_id = categories.id where pictures.id = ?;", (picture_id,), one=True)
#     if picture is None:
#         abort(404)

#     value = int(request.form['value'])
#     if value and 0 <= value <= 5:
#         execute_db("insert into votes (value, picture_id) values (?, ?);", (value, picture_id))

#     return redirect(f"/pictures/{picture_id}")


# @app.route('/uploadd', methods=['POST', 'GET'])
# def fileUpload():
#     target=os.path.join(app.config['UPLOAD_FOLDER'])
#     if not os.path.isdir(target):
#         os.mkdir(target)
#     file = request.files['file'] 
#     filename = secure_filename(file.filename)
#     destination="/".join([target, filename])
#     file.save(destination)
#     session['uploadFilePath']=destination
#     response="Whatever you wish too return"
#     return response


if __name__ == "__main__":
    app.run()
