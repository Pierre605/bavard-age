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

from .models import query_db, execute_db, fetchone_db

from io import BytesIO

def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def connected_user():
    if session['user']:
        return session['user']


@app.route('/public/uploads/<filename>')
def send_file(filename):
    return send_from_directory('../' + app.config['UPLOAD_FOLDER'], filename)

session = {}

# @app.context_processor
# def inject_categories_for_all_templates():
#     return {
#         'categories': query_db("select * from categories"),
#         'post_form': session.pop('add-post-errors', None),
#         'current_category': request.args.get('category', None),
#     }


@app.template_filter('strftime')
def _jinja2_filter_datetime(date, fmt='%d/%m/%Y at %H:%M:%S'):
    date = datetime.datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
    date += datetime.timedelta(hours=1) # Gestion du timezone
    return datetime.datetime.strftime(date, fmt)


@app.route("/")
def hello():
    return ("hello world!")


@app.route("/login", methods=['POST'])
def login():
    postdata = request.form
    if postdata.get('username') and postdata.get('password'):
        username = postdata.get('username')
        password = hashlib.sha256(postdata.get('password').encode()).hexdigest()
        existing_user = query_db("""SELECT id FROM user WHERE username = (?) and password = (?)""", (username, password), True)
        print('existing_user', existing_user)
        if existing_user:
            session['user'] = existing_user[0]
            print("session[user]", session['user'])
            return "{logged_in : true}"
        else:
            return "{logged_in : false}"

# curl -d "username=Michel&password=Michel" -X POST http://127.0.0.1:5000/login -c cookies.txt
# curl -d "username=Juan&password=Toto" -X POST http://127.0.0.1:5000/login -c cookies.txt
# curl -d "username=Juan&password=Juan" -X POST http://127.0.0.1:5000/login -c cookies.txt
    

@app.route("/logout")
def logout():
# déconnecte l'utilisateur
# en cas de succès, renvoie un dictionnaire {disconnected : true}
# en cas d'échec, renvoie un dictionnaire {disconnected : false}
    # print(session['user'])
    # return (session['user'])
    if session.get('user'):
        print("session[user]", session['user'])
        for key in list(session.keys()):
            session.pop(key)
        return '{"disconnected" : true}'
    else:
        return '{"disconnected" : false}'

# curl http://127.0.0.1:5000/logout -b cookies.txt

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


@app.route('/create_conversation', methods=['POST'])
def create_conversation(): 
# créer une conversation à partir de l'email (email) de chaque participant et
# éventuellement le nom d'une conversation (name)
# renvoyer la liste des mails  avec l'id de la conversation créé, 
# sous forme de dictionnaire json {created_conversation : id }
# si aucun email des emails fournis ne correspond à un utilisateur,
# renvoyer le dico json {created_conversation : false }
    postdata = request.form
    
    result = dict(conversation_created = '')
    # if session.get('user') and postdata.get('email') and postdata.getlist('email'):
    if postdata.get('email') and postdata.getlist('email'):
        print("post_data", postdata.get('email'), postdata.get('name'))
        user_list = []
        print('user_list', user_list)
        if postdata.get('name'):
            conversation_name = postdata.get('name')
        else:
            conversation_name = "NULL"
        conversation_name = postdata.get('name')
        print('conversation_name', conversation_name)
        print("postdata.getlist('email')", postdata.getlist('email'))
        for email in postdata.getlist('email'):
            print('email', email)
            user_id = fetchone_db(""" SELECT id
                                    FROM user
                                    WHERE email = (?)""", [email])
            print("user_id", user_id)
            if not user_id is None and user_id != 'None':
                print("user_id", user_id)
                user_list.append(user_id)
            if len(user_list) > 0:
                print('user_list', user_list)
                # result = fetchone_db(""" SELECT id
                #                             FROM conversation
                #                             WHERE name = (?)""", [conversation_name])  
                # print('existing_conversation_id', conversation_id[0]) 
                # if str(result) == 'None' :   
                    # print("No existing conversation : create new conversation") 

                if session.get('user') not in user_list:
                    user_list.append(session.get('user'))                
                result = execute_db(""" INSERT INTO conversation (name)
                                                VALUES (?)""", [conversation_name])
                conversation_id = result
                print("new_conversation_id", conversation_id)
                # else:
                    # conversation_id = result
                    # print('existing_conversation_id', conversation_id) 
                print('user_list, conversation_id', user_list, conversation_id)
            print("user_id", user_id)
            for user_id in user_list:
                print('user_id, conversation_id', user_id, conversation_id)
                # result = fetchone_db(""" SELECT user_id, conversation_id
                #                             FROM user_conversation
                #                             WHERE user_id = (?)
                #                                 AND conversation_id = (?) """, [user_id, conversation_id])  
                # print('existing_conversation_id', conversation_id[0]) 
                # if str(result) == 'None': 
                #     print("No existing user_conversation : create new user_conversation")    

                #     # if session.get('user') not in user_list:
                #     #     user_list.append(session.get('user'))
                result = execute_db(""" INSERT INTO user_conversation 
                                        (user_id, conversation_id) VALUES
                                        (?, ?)""", [user_id, conversation_id])
                print('new_user_conversation_ids', result)           
                user_conversation_ids = result
                print("user_conversation_ids", user_conversation_ids)
                # else:
                #     user_conversation_ids = result
                #     print('existing_user_conversation_ids', user_conversation_ids) 
                
                # if session['user']:    
                #     result = dict(created_conversation = str(user_conversation_ids))
                #     print('route/create_conversation/new_conversation/result/user_conversation_ids/True', result)
                # else:
                #     result = dict(registered = False)
                #     print('route/create_conversation/new_conversation/result/user_conversation_ids/False', result)
        result = dict(conversation_name = conversation_name, user_list = user_list, user_conversation_ids = user_conversation_ids)
        return jsonify(result)
            # renvoyer (json)
            # return jsonify(result)
            
# Test Flask:                       
# curl -d "name=Conv-poto&email=Juan@blablapp.com" -X POST http://127.0.0.1:5000/create_conversation
# {"conversation_name":"Conv-poto","user_list":[1]}
# curl -d "name=NouvelleConversation&email=Juan@blablapp.com" -X POST http://127.0.0.1:5000/create_conversation
# {"conversation_name":"NouvelleConversation","user_list":[1]}
# curl -d "name=NewChat&email=Juan@blablapp.com&email=Damien@blablapp.com" -X POST http://127.0.0.1:5000/create_conversation
# {"conversation_name":"NewChat","user_conversation_ids":3,"user_list":[1,3]}
# curl -d "name=NouveauChat&email=Juan@blablapp.com&email=Damien@blablapp.com&email=TOto@blablapp.com" -X POST http://127.0.0.1:5000/create_conversation
# {"conversation_name":"NouveauChat","user_conversation_ids":12,"user_list":[1,3,4]}

@app.route("/conversation-list", methods=['GET'])
def chatroom_select(): # renvoie la liste des conversations à laquelle un user participe
# si l'utilisateur a des conversations : renvoie une liste des conversations au format [id, nom, participants]
# si l'utilisateur n'a pas de conversations : renvoie une liste vide []
    L = []
    if session.get('user'):
        print("session_user:    ", session['user'])
        user = session.get('user')
        listes_conversations = query_db(""" SELECT
        conversation.id, conversation.name,
        GROUP_CONCAT(user.username) AS participants
        FROM
        user
        LEFT JOIN
        user_conversation
        ON
        user_conversation.user_id = user.id
        LEFT JOIN
        conversation
        ON
        conversation.id = user_conversation.conversation_id
        WHERE
        conversation.id
        IN (
        SELECT
        conversation.id
        FROM
        user, conversation, user_conversation
        WHERE
        user.id = user_conversation.user_id
        AND
        conversation.id = user_conversation.conversation_id
        AND user_id = (?))
        GROUP BY
        conversation.name""", [user])
        for liste in listes_conversations:
            print(dict(liste))
            L.append(dict(liste))
        return jsonify(L)
    else:
        return ("no user session")

# curl http://127.0.0.1:5000/conversation-list

@app.route('/conversation/<int:conversation_id>', methods=['GET'])
def conversation(conversation_id):
# renvoie un dictionnaire des messages pour une chatroom donnée
# si la chatroom a des messages : renvoie une liste (json) au format suivant :
# [[username1, message1], [username2, message2], ...]
# si l'utilisateur n'a pas de conversations : renvoie une liste vide []
    if session.get('user'):
        list_convers_messages = []
        user = session.get('user')
        # on vérifie que user fait bien partie de conversation
        user_ok = query_db(""" SELECT
            GROUP_CONCAT(conversation_id)
            FROM
            user_conversation
            WHERE
            user_conversation.user_id = (?)
            AND
            user_conversation.conversation_id = (?)""",
            [user, conversation_id], one=True)
        if user_ok[0] != None:
            res_query = query_db(
                """SELECT username, content FROM message, user, conversation
                WHERE user.id = message.user_id 
                AND conversation.id = message.conversation_id 
                AND conversation.id = (?)""", [conversation_id])
            for liste in res_query:
                # print(list(liste))
                list_convers_messages.append(list(liste))
            session['room'] = conversation_id
            return jsonify(list_convers_messages)
        else:
            return jsonify(list_convers_messages)
    else:
         return ("no user logged so no conversation id")

# curl -d "username=Michel&password=Michel" -X POST http://127.0.0.1:5000/login
# curl http://127.0.0.1:5000/conversation/1 
# (ok)
# curl http://127.0.0.1:5000/conversation/3 
# (pas bon)


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
