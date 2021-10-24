# BLAblaPp project Back-end side with Flask, Python, SQLite3, SQL

## Première installation, suite à Git clone
```git clone https://gitlab.matrice.io/blablapp-react-426/tkiener-blablapp-react):```

Activation de virtualenv :
> Le pompt change, et l'env virtuel apparaît (virt-env)


## Installation de CORS :
```pip install -U flask-cors```
 et sous Mac :
```pip3 install -U flask-cors```
## Désinstallation de SocketIO
```pip uninstall -r requirements.txt python-socketio```
```pip uninstall -r requirements.txt python-engineio```
```pip uninstall -r requirements.txt Flask-SocketIO```
 et sous Mac :
```pip3 uninstall -r requirements.txt python-socketio```
```pip3 uninstall -r requirements.txt python-engineio```
```pip3 uninstall -r requirements.txt Flask-SocketIO```
## Installation de SocketIO
```pip install --upgrade python-socketio==4.6.0```
```pip install --upgrade python-engineio==3.13.2```
```pip install --upgrade Flask-SocketIO==4.3.1```
 et sous Mac :
```pip3 install --upgrade python-socketio==4.6.0```
```pip3 install --upgrade python-engineio==3.13.2```
```pip3 install --upgrade Flask-SocketIO==4.3.1```

Mise à jour de l'environnement virtuel env (suite à installation):
```cd ..```
```pip freeze > requirements.txt```
 et sous Mac :
```pip3 freeze > requirements.txt```

Initier les variables Flask
```export FLASK_APP=app.py```
```export FLASK_ENV=development```



## Initialiser la base de données du projet et à chaque màj de la db:
```flask init_db```

Lancer le projet :
```flask run```


## Après une màj du back, suite à Git pull dans ./back/
```git pull```

Activation de virt-env-back :
```source virt-env-back/bin/activate```

###(Désactivation de virt-env-back :)
```deactivate```

Lancer le projet :
```flask run```


### Fichier pour ignorer les fichiers de virt-env à ne pas ajouter dans le Git :
```.gitignore```
### liste des fichiers à ignorer pour Git
```database/```
```__pycache__/```
```app/__pycache__/```

### Mise à jour de l'environnement virtuel env (suite à installation):
```cd ..```
```pip freeze > requirements.txt```
 et sous Mac :
```pip3 freeze > requirements.txt```

### CTL+C pour stopper le Front-end

### (Désactivation de virt-env :)
```deactivate```