# Flask chat app project Back-end side with Flask (SocketIO), Python and Front-end with js (SocketIO).

## Source
`https://codeburst.io/building-your-first-chat-application-using-flask-in-7-minutes-f98de4adfa5d

## Première installation, suite à Git clone
```git clone https://gitlab.matrice.io/blablapp-react-426/tkiener-blablapp-react):```

Installation de virtualenv :
```pip install virtualenv```
 et sous Mac :
```pip3 install virtualenv```

Création de l'environnement virtuel env :
```virtualenv -p python3 virt-env```

Mise à jour de l'environnement virtuel env (suite à installation):
```pip install -r requirements.txt```
```pip freeze > requirements.txt```
 et sous Mac :
```pip3 install -r requirements.txt```
```pip3 freeze > requirements.txt```

Activation de virt-env :
```source virt-env/bin/activate```

 Initier les variables Flask
```export FLASK_APP=app.py```
```export FLASK_ENV=development```

Installation de SocketIO
```pip3 install flask-socketio```

Lancer le projet :
```python3 main.py```

### (Désactivation de virt-env :)
```deactivate```
