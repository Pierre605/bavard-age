from .views import app
from flask import g

import sqlite3
import hashlib
from datetime import datetime
import os

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE'])
        db.row_factory = sqlite3.Row
    return db


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def execute_db(query, args=()):
    cur = get_db().cursor()
    cur.execute(query, args)
    cur.close()
    return cur.lastrowid


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.commit()
        db.close()

# Initialiser la database
def init_db():
    # Créer le répertoire de la database sur le serveur back
    os.makedirs(os.path.dirname(app.config['DATABASE']), exist_ok=True)

    # Supprimer les tables de la database
    for table in (
                'message'
                , 'user_contact'
                , 'user_conversation'
                , 'conversation'
                , 'user'
                , 'gdpr'
                ):
        execute_db(f"drop table if exists {table};")

    # Créer les tables de la database
    # Créer la table des utilisateurs (user)
    execute_db("""
            CREATE TABLE user 
                (
                  id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE
                , username VARCHAR(200) UNIQUE NOT NULL
                , email TEXT UNIQUE NOT NULL
                , password TEXT NOT NULL
                );
                """)
    # Créer la table du consentement RGPD (gdpr)
    execute_db("""
        CREATE TABLE gdpr
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE
            , has_consent BOOLEAN DEFAULT FALSE NOT NULL
            , consent_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            , user_id INTEGER NOT NULL
            , CONSTRAINT fk_gdpr_user
                FOREIGN KEY (user_id)
                REFERENCES user(id)
            );
            """)
    # Créer la table des messages (message)
    execute_db("""
        CREATE TABLE message
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE
            , content TEXT NOT NULL
            , sent_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            , user_id INTEGER NOT NULL
            , conversation_id INTEGER NOT NULL
            , CONSTRAINT fk_message_user
                FOREIGN KEY (user_id)
                REFERENCES user(id)
            , CONSTRAINT fk_message_conversation
                FOREIGN KEY (conversation_id)
                REFERENCES conversation(id)
            );
            """)
    # Créer la table des conversations (conversation)
    execute_db("""
        CREATE TABLE conversation
            ( id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE
            , name VARCHAR(200)
            , opened_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
                """)

    # Créer la table d'association entre utilisateur et conversation (user_conversation)
    execute_db("""CREATE TABLE user_conversation (user_id INTEGER,
        conversation_id INTEGER,
        CONSTRAINT pk_user_conversation
            PRIMARY KEY (user_id, conversation_id)
        CONSTRAINT fk_conversation_user
            FOREIGN KEY (user_id)
            REFERENCES user(id),
        CONSTRAINT fk_user_conversation
            FOREIGN KEY (conversation_id) 
            REFERENCES conversation(id));""")

    # Créer la table d'association entre utilisateur et contacts (user_contact)
    execute_db("""CREATE TABLE user_contact (user_id INTEGER,
        contact_id INTEGER,
        CONSTRAINT pk_user_contact
            PRIMARY KEY (user_id, contact_id)
        CONSTRAINT fk_user_id
            FOREIGN KEY (user_id)
            REFERENCES user(id),
        CONSTRAINT fk_contact_id
            FOREIGN KEY (contact_id) 
            REFERENCES user(id));""")

    # Insérer un jeu de données dans la database (phase de tests)

    for nom in ['Juan', 'Michel', 'Damien']:
        execute_db("""INSERT INTO user (username, email, password) 
                    VALUES (?, ?, ?)""", (nom, nom+'@blablapp.com'
                    , hashlib.sha256(nom.encode()).hexdigest()))
    for i in range(1, 4):
        execute_db("""INSERT INTO gdpr (has_consent, user_id)
                    VALUES (?, ?);""", (True, i))
    for i in range(1, 4):
        for j in range(1, 4):
            if i!=j:
                execute_db("""INSERT INTO user_contact (user_id, contact_id)
                VALUES (?, ?);""", (i, j))   
    for e in ['La famille', 'Conv-poto', 'Petit-chat']:
        execute_db("""  INSERT INTO conversation (name)
                    VALUES (?);""", [e])
    n = 1
    msg = ['Salut', 'Ça va?']
    for i in range(1, 4):
        for j in range(1, 4):
            if n%5!=1:
                execute_db("""INSERT INTO user_conversation (user_id, conversation_id)
                    VALUES (?, ?);""", (i, j))
            
                execute_db("""INSERT INTO message (content, user_id, conversation_id)
                    VALUES (?, ?, ?);""", (msg[i%2], i, j))
            n += 1          
    