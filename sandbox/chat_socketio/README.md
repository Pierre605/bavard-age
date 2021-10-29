# Flask chat socket.io project Back-end side with Flask (SocketIO), Python and Front-end with js (SocketIO).

## Source   
`https://codeburst.io/building-your-first-chat-application-using-flask-in-7-minutes-f98de4adfa5d

## Première installation, suite à Git clone
```git clone https://gitlab.matrice.io/blablapp-react-426/tkiener-blablapp-react):```

### Installation de virtualenv :
```pip install virtualenv```
 et sous Mac :
```pip3 install virtualenv```

### Création de l'environnement virtuel env :
```virtualenv -p python3 virt-env```

### Mise à jour de l'environnement virtuel env (suite à installation):
```pip install -r requirements.txt```
```pip freeze > requirements.txt```
 et sous Mac :
```pip3 install -r requirements.txt```
```pip3 freeze > requirements.txt```

## Activation de virt-env :
```source virt-env/bin/activate```

Si les versions de socket.io sont différentes de celle-ci, alors il faut les désinstaller :

### Désinstallation de SocketIO
```
pip uninstall -r requirements.txt python-socketio
pip uninstall -r requirements.txt python-engineio
pip uninstall -r requirements.txt Flask-SocketIO
```
 et sous Mac :
```
pip3 uninstall -r requirements.txt python-socketio
pip3 uninstall -r requirements.txt python-engineio
pip3 uninstall -r requirements.txt Flask-SocketIO
```
### Installation de SocketIO
```
pip install --upgrade python-socketio==4.6.0
pip install --upgrade python-engineio==3.13.2
pip install --upgrade Flask-SocketIO==4.3.1
```
 et sous Mac :
```
pip3 install --upgrade python-socketio==4.6.0
pip3 install --upgrade python-engineio==3.13.2
pip3 install --upgrade Flask-SocketIO==4.3.1
```
ou
```
npm install socket.io
pip3 install flask-socketio
```

### Petits rappels d'installation pour Flask
### Installation de CORS :
```pip install -U flask-cors```
 et sous Mac :
```pip3 install -U flask-cors```

### Initier les variables Flask
```
export FLASK_APP=app.py
export FLASK_ENV=development
```

## Lancer le projet :
```python3 main.py```

## Pour stopper le back-end :
`Ctrl + C`

### (Désactivation de virt-env :)
```deactivate```
