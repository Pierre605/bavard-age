import os
from datetime import datetime
import hashlib
import sqlite3

from flask import jsonify, Flask, render_template, request, redirect, url_for, current_app
from flask import send_from_directory, session, abort, Markup, make_response
from flask_cors import CORS
# from flask_login.utils import login_user, logout_user
from flask_socketio import SocketIO, emit
# from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from io import BytesIO
from werkzeug.utils import secure_filename

from flask import g

app = Flask(__name__)
cors = CORS(app)
CORS(app)
app.config.from_object('config')
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['DEBUG'] = True
# host à localhost
# app.host = 'localhost'

socketio = SocketIO(app, cors_allowed_origins="*")

# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = "login"

# import du modèle
from .models import query_db, execute_db

# variable globale de contexte utilisateur

user_session = {'user': '', 'chatroom': '', 'username': ''}
print('user_session', user_session)
session = {'sessions': [user_session, ]}
print('session', session)
    

# class User(UserMixin):

#     def __init__(self, id):
#         self.id = id
        
#     def __repr__(self):
#         return ({"id": self.id, "is_authenticated": "", "is_active": ""})

# @login_manager.user_loader
# def load_user(user_id):
#     print(User.get(user_id))
#     return User.get(user_id)

# fonctions
# <<<<<<< HEAD
# def get_user_connected(id):
#     for user_session in session['sessions']:
#         print('user_session', user_session)
#         if user_session['user'] == id:
#             return user_session['user']


# def get_user_name(id):
#     for user_session in session['sessions']:
#         print('user_session', user_session)
#         if user_session['user'] == id:
#             if user_session['username']:
#                 return user_session['username']    


# def get_user_chatroom(id):
#     for user_session in session['sessions']:
#         print('user_session', user_session)
#         if user_session['user'] == id:
#             if user_session['chatroom']:
#                 return user_session['chatroom']    


# def delete_user_session(id):
#     for user_session in session['sessions']:
#         print('user_session', user_session)
#         if user_session['user'] == id:
#             if user_session['chatroom']:
#                 return user_session['chatroom']    
# =======
# def get_user_connected():
#     if session['user']:
#         return session['user']


# def get_user_name():
#     if session['username']:
#         return session['username']


# def get_user_chatroom():
#     if session['chatroom']:
#         return session['chatroom']
# >>>>>>> branche-de-pierre


# def str_to_bool(s):
#     print('s', s)
#     if s == 'True' or s == 'true':
#          return True
#     if s == 'False' or s == 'false':
#          return False
#     else:
#          raise ValueError  # evil ValueError that doesn't tell you what the wrong value was


def allowed_file(filename):
        return '.' in filename \
 and filename.rsplit('.', 1)[1].lower() \
 in app.config['ALLOWED_EXTENSIONS']

@socketio.on('message sent')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response du back', json, callback=messageReceived)

# Socket IO
# Quand un Client émet un événemet utilisant une réponse json,
# contenant un message,
# la fonction message_sent renvoie ce message à tous les clients
# @socketio.on('message sent', namespace='/chat')
# def message_sent(json, methods=['GET', 'POST']):
#     print('received my event: ' + str(json))
#     socketio.emit('my response', json, callback=messageReceived)
#     result = dict(sent_message = False)
#     print('jsonresponse', jsonresponse)
#     # session['chatroom']=jsonresponse['chatroom'];
#     # print('session-room', session['chatroom'])
#     if jsonresponse['user'] and jsonresponse['chatroom']:
#         # if 'message' in jsonresponse.keys() and jsonresponse['message'] != "" and jsonresponse['chatroom'] and jsonresponse['chatroom'] == session.get('room'):
#         db = getattr(g, '_database', None)
#         if db is None:
#             db = g._database = sqlite3.connect(app.config['DATABASE'])
#             db.row_factory = sqlite3.Row
#         cur = db.cursor()
#         # print("session['user'], session['chatroom']", session['user'], session['chatroom'])
#         # cur.execute(
#         #     """SELECT user.id 
#         #     FROM user, user_conversation 
#         #     WHERE user.id = user_conversation.user_id
#         #     user_conversation.user_id=(?) 
#         #     AND
#         #     user_conversation.conversation_id = (?);
#         #     """, [session['user'], session['chatroom']])
#         # rv = cur.fetchall()
#         # id_user = rv[0] if rv else None
#         # if id_user:
# # <<<<<<< HEAD
#         socketio.emit('my response'
#                       , 'my response'
#                       , callback=messageReceived)
#                       # , chatroom=session['chatroom'])
# # =======
#         # emit('my response'
#         #               , jsonresponse
#         #               , callback=messageReceived
#         #               , chatroom=jsonresponse['chatroom']
#         #               , broadcast=True)
# # >>>>>>> branche-de-pierre
#         # send(jsonresponse['message'], broadcast=True)
#         cur.execute(
#             """INSERT INTO message
#             (user_id, conversation_id, content) 
#             VALUES (?, ?, ?)
#             """, (jsonresponse['user'], jsonresponse['chatroom'], jsonresponse['message']))
#         cur.close()
#         message = cur.lastrowid
#         if message:    
#             result = dict(sent_message=True)
#             # renvoyer (json)
#     return jsonify(result)


# Routes Flask de l'app views 
# 
#   /    -> HomePage.jsx
#   (authentification features)
#   /    -> Login.jsx
#   /logout    -> Logout.jsx
#   /register  -> Register.jsx
#   /login     -> Login.jsx
# 
#   (conversation features)
#   /conversation_list                  -> UserHome.jsx
#   /create_conversation                -> CreateConversation.jsx
#   /conversation/<conversation_id>     -> InConversation.jsx
#
#   (chat features)
#   /join     -> ?.jsx
#   /chat     -> Chat.jsx
#   /leave    -> ?.jsx


# Route principale (homepage -> HomePage.jsx)
# @app.route("/")
# def hello():
#     return ("hello world!")

# @app.route("/sessions/<int:user_id>", methods=['GET'])
@app.route("/chat", methods=['GET', 'POST'])
def sessions():
    print('routesessionhtml')
    # username = query_db(""" SELECT username
    #                         FROM user
    #                         WHERE id = 1"""
    #                         , one=True)[0]
    #                         # , [user_id], one=True)[0]
    # print('username', username)
    return render_template('session.html')  # , username = username)


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')


# Route de connexion (login -> Login.jsx)
@app.route("/login", methods=['POST'])
def login():
    postdata = request.form
    if postdata.get('username') and postdata['password']:
        username = postdata.get('username')
        password = hashlib.sha256(postdata.get('password').encode()).hexdigest()
        existing_user = query_db("""SELECT id 
                                    FROM user 
                                    WHERE username = (?) 
                                    and password = (?);
                                    """, (username, password), one=True)
        if existing_user:
            session['user'] = existing_user[0]
            session['username'] = username
            print("login/session_user", session['user'])
            print('login/session_username', session['username'])
            # user = User(existing_user[0])
            # print("User.id: ", user.id)
            # login_user(user)     
            return jsonify("{logged_in : true}")
        else:
            return "{logged_in : false}"


# Route de déconnexion (logout -> Logout.jsx)
# déconnecte l'utilisateur
# en cas de succès, renvoie un dictionnaire {disconnected : true}
# en cas d'échec, renvoie un dictionnaire {disconnected : false}
@app.route("/logout")
def logout():
    # logout_user()
    if session['user']:
        for key in list(session.keys()):
            session.pop(key)
        return '{"disconnected" : true}'
    else:
        return '{"disconnected" : false}'


# Route d'enregistrement (register -> Register.jsx)
# inscrire un utilisateur dans la base de données,
# avec les données postées (form): username, email et password
# si l'enregistrement marche : connecter l’utilisateur et
# renvoyer (json) {registered : true} 
# sinon : renvoyer (json) {registered : false}
@app.route('/register', methods=['POST'])
def register():  
    postdata = request.form.to_dict()
    result = dict(registered = False)
    print('postdata', postdata)
    print('postdata_username', postdata['username'])
    print('postdata_email', postdata['email'])
    print('postdata_password', postdata['password'])
    print('postdata_gdpr_consent', postdata['gdpr'])   
    if postdata:
        if postdata['username'] \
            and postdata['password'] \
            and postdata['email'] \
            and postdata['gdpr']:
            username = postdata['username']
            email = postdata['email']
            password = postdata['password']
            gdpr_consent = postdata['gdpr']
            print('postdata_username', username)
            print('postdata_email', email)
            print('postdata_password', password)
            print('postdata_gdpr_consent', gdpr_consent)
            user_create_blocker = query_db("""
                    SELECT count(id) 
                    FROM user 
                    WHERE (username = (?)
                    OR email = (?));"""
                    , (username, email), one=True)[0]
            if user_create_blocker == 0 and (gdpr_consent == "True" or gdpr_consent == 'true'):
                # sinon : enregistrer le nouvel utilisateur
                # si l'enregistrement marche : connecter l’utilisateur
                print("user_create_blocker", user_create_blocker)
                new_user_id = execute_db("""
                    INSERT INTO user 
                    (username, email, password)
                    values (?, ?, ?);"""
                    , (username \
                        , email \
                        , hashlib \
                        .sha256(password.encode()).hexdigest()))
                session['user'] = new_user_id
                session['username'] = username
                # login_user(new_user_id)
                print("session_user", session['user'])
                gdpr_res = execute_db(
                    """INSERT INTO gdpr 
                    (has_consent, user_id) 
                    values (?, ?);"""
                    , [gdpr_consent, session['user']])
                print("gdpr_res", gdpr_res)
                if session['user']:    
                    result = dict(registered = True)
            # renvoyer (json)
    return jsonify(result)


# Route de liste des conversations
# (conversation-list -> UserHome.jsx)
# renvoie la liste des conversations
# à laquelle un user participe
# renvoioe la liste des contacts du user
# renvoie un dictionnaire des messages
# pour une chatroom donnée
# si la chatroom a des messages :
# > renvoie une liste (json) au format suivant :
#   [[username1, message1], [username2, message2], ...]
# si l'utilisateur n'a pas de conversations :
# renvoie une liste vide []
@app.route("/conversation-list", methods=['GET'])
def chatroom_select():
    if session.get('user'):
        user = session.get('user')
        result_list = []
        # print("current_user ", current_user)
        # on vérifie que user fait bien partie de conversation
        conversations = query_db(""" 
            SELECT
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
            conversation.name"""
            , [user])

        print('conversations: ', conversations)
        contacts = query_db(""" 
                    SELECT u.id, u.username, u.email
                    FROM user_contact uc
                    INNER JOIN user as u
                    ON uc.contact_id=u.id
                    WHERE user_id = (?)"""
                    , [user])
        print("SUCESS !!")
        if conversations:
            return jsonify({'conversations': [dict(row) for row in conversations]
                , 'contacts': [dict(contact_id = row[0], username = row[1], email = row[2]) for row in contacts]})
        else:
            return ([])


# Route de création de conversation
# (create_conversation -> CreateConversation.jsx)
# créer une conversation à partir de l'email (email)
# de chaque participant et
# éventuellement le nom d'une conversation (name)
# renvoyer la liste des mails  avec l'id de la conversation créée, 
# sous forme de dictionnaire json {created_conversation : id }
# si aucun email des emails fournis ne correspond à un utilisateur,
# renvoyer le dico json {created_conversation : false }
@app.route('/create_conversation', methods=['POST'])
def create_conversation(): 
    postdata = request.form
    L = []
    user_list = []    
    result = dict(conversation_created = False)
    if session['user'] != '' \
        and session['username'] != '' \
        and postdata['email'] \
        and postdata.getlist('email'):
        print("post_data", postdata['email'], postdata['name'])
        if postdata['name']:
            conversation_name = postdata['name']
        else:
            conversation_name = "NULL"
        print('conversation_name', conversation_name)
        print("postdata.getlist('email')", postdata.getlist('email'))

        emails = postdata.get('email').split(", ")

        for email in emails:
            print('email', email)
            user_id = query_db(""" SELECT id
                                    FROM user
                                    WHERE email = (?)"""
                                    , [email], one=True)[0]
            if user_id:
                L.append(user_id)

        for id in L:
            user_list.append(id)
        print('liste participants:  ', user_list)

    if len(user_list) > 0:
        if session['user'] not in user_list:
            user_list.append(session['user'])
        new_conversation_id = execute_db(""" 
                                INSERT INTO conversation 
                                (name) VALUES (?)"""
                                , [conversation_name])
        
        print('final user_list, conversation_id', user_list, new_conversation_id)
        
        for user_id in user_list:        
            id_participants = execute_db("""
                                INSERT INTO user_conversation 
                                (user_id, conversation_id) VALUES
                                (?, ?)""", [user_id, new_conversation_id])
            print('user_id, conversation_id, id_participants', user_id, new_conversation_id, id_participants)
      
        result = dict(conversation_id = new_conversation_id)

        return jsonify(result)
    else:
        return ("Adresse email non reconnue")


# Route de salle de conversation (conversation -> InConversation.jsx)
# GET
# renvoie un dictionnaire des messages pour une chatroom donnée
# si la chatroom a des messages : renvoie une liste (json) au format suivant :
# [[username1, message1], [username2, message2], ...]
# si l'utilisateur n'a pas de conversations : renvoie une liste vide []
# POST
# envoi un message pour une chatroom donnée
@app.route('/conversation/<int:conversation_id>', methods=['GET', 'POST', 'PUT'])
def conversation(conversation_id):
    try:
        if request.method == "GET":
            if session['user']:
                list_convers_messages = []
                user = session['user']
                # on vérifie que user fait bien partie de conversation
                user_ok = query_db("""
                    SELECT
                    GROUP_CONCAT(conversation_id)
                    FROM
                    user_conversation
                    WHERE
                    user_conversation.user_id = (?)
                    AND
                    user_conversation.conversation_id = (?)"""
                    , [user, conversation_id]
                    , one=True)[0]
                if user_ok != None:
                    res_messages = query_db("""
                        SELECT message.id, username, content, sent_date 
                        FROM message, user, conversation
                        WHERE user.id = message.user_id 
                        AND conversation.id = message.conversation_id 
                        AND conversation.id = (?);""" 
                        , [conversation_id])
                    for message in res_messages:
                        list_convers_messages.append(list(message))
                    liste_particip = query_db(""" SELECT 
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
                    conversation.id = (?)""", [conversation_id])
                    participants = liste_particip[0][0]
                    liste_participants = (participants).split(',')

                    session['room'] = conversation_id
                    print(list_convers_messages, str(session['username']))
                    return jsonify(list_convers_messages, str(session['username']), liste_participants, str(session['user']))
                else:
                    print("user not in this conversation")
                    return jsonify("user not in this conversation")
            else:
                return ("no user logged so no conversation id")

        if request.method == "POST":
            postdata = request.form
            L = []
            user_list = []    
            result = dict(message_sent = False)
            if session.get('user') and postdata.get('username') and postdata.get('message'):
                print("post_data", postdata.get('username'), postdata.get('message'))
                if postdata.get('message'):
                    message_content = postdata.get('message')
                else:
                    message_content = "NULL"
                # conversation_name = postdata.get('name')
                print('mmessage_name', mmessage_name)
                print("postdata.get('message')", postdata.get('message'))
                user_id = query_db(""" SELECT id
                                        FROM user
                                        WHERE username = (?)""", [username])
                if user_id and user_id == session.get('user'):
                    new_message_id = execute_db(""" INSERT INTO message (content) VALUES (?)""", [message_content])
                
                print('user_id, new_message_id', user_id, new_message_id)    
                result = dict(conversation_id = new_message_id)

            return jsonify(result)
        
        if request.method == "PUT":
             postdata = request.form
             print(postdata.get('id'))
             if postdata.get('id'):
                 message_id = postdata.get('id')
                 cursor2 = execute_db("UPDATE message SET content = ? WHERE id = ?",["message supprimé", message_id])
             return postdata
                


    except IndexError:
        abort(404)

# Route de création de contact
# (create_convtact -> CreateContact.jsx)
# créer un contact à partir de l'email (email) du contact
# et de l'identifiant de l'utilisateur connecté (id)
# renvoyer le contact créé, 
# sous forme de dictionnaire json {created_contact : id }
# si l'email fourni ne correspond à aucun utilisateur (User),
# renvoyer le dico json {created_contact : false }
@app.route('/create_contact', methods=['POST'])
def create_contact(): 
    postdata = request.form   
    result = dict(contact_created = dict(result = False, contact_id = 'NULL'))
    if session['user'] != '' \
        and postdata['email']:
        print("post_data", postdata['email'])
        if postdata['email']:
            contact_email = postdata['email']
        else:
            contact_email = "NULL"
        print('contact_email', contact_email)
        contact_id = query_db(""" SELECT id
                                FROM user
                                WHERE email = (?)"""
                                , [contact_email], one=True)
        if not contact_id is None:
            if contact_id[0] != session['user']:
                print('contact_id:  ', contact_id[0])
                not_existing_contact_id = query_db(""" SELECT count(*)
                            FROM user_contact
                            WHERE user_id = (?)
                            AND contact_id = (?)"""
                            , [session['user'], contact_id[0]], one=True)[0]
                if not_existing_contact_id ==0:
                    print('not_existing_contact_id:  ', not_existing_contact_id)
                    new_user_contact_id = execute_db("""
                                    INSERT INTO user_contact 
                                    (user_id, contact_id) VALUES
                                    (?, ?)""", [session['user'], contact_id[0]])
                    print('user_id, new_user_contact_id', session['user'], new_user_contact_id)
                    result = dict(contact_created = dict(result = True, contact_id = contact_id[0]))
    return jsonify(result)


# Route de chargement d'un fichier (uploads)
@app.route('/public/uploads/<filename>')
def send_file(filename):
    return send_from_directory('../' + app.config['UPLOAD_FOLDER'], filename)


@app.template_filter('strftime')
def _jinja2_filter_datetime(date, fmt='%d/%m/%Y at %H:%M:%S'):
    date = datetime.datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
    date += datetime.timedelta(hours=1)  # Gestion du timezone
    return datetime.datetime.strftime(date, fmt)


# @app.context_processor
# def inject_categories_for_all_templates():
#     return {
#         'categories': query_db("select * from categories"),
#         'post_form': session.pop('add-post-errors', None),
#         'current_category': request.args.get('category', None),
#     }


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
    # app.run(host='0.0.0.0', debug=True)
    socketio.run(app, debug=True)
    print("run views.py")
