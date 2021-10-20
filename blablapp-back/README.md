# BLAblaPp project Back-end side with Flask, Python, SQLite3, SQL

## Première installation, suite à Git clone
```git clone https://gitlab.matrice.io/blablapp-react-426/tkiener-blablapp-react):```

Installation de virtualenv :
```pip install virtualenv```
 et sous Mac :
```pip3 install virtualenv```

Création de l'environnement virtuel env :
```virtualenv -p python3 virt-env-back```

Mise à jour de l'environnement virtuel env (suite à installation):
```pip install -r requirements.txt```
```pip freeze > requirements.txt```
 et sous Mac :
```pip3 install -r requirements.txt```
```pip3 freeze > requirements.txt```

Activation de virt-env :
```source virt-env-back/bin/activate```

 Initier les variables Flask
```export FLASK_APP=app.py```
```export FLASK_ENV=development```
Installation de CORS :
```pip install -U flask-cors```
 et sous Mac :
```pip3 install -U flask-cors```
Désinstallation de SocketIO
```pip uninstall -r requirements.txt python-socketio```
```pip uninstall -r requirements.txt python-engineio```
```pip uninstall -r requirements.txt Flask-SocketIO```
 et sous Mac :
```pip3 uninstall -r requirements.txt python-socketio```
```pip3 uninstall -r requirements.txt python-engineio```
```pip3 uninstall -r requirements.txt Flask-SocketIO```
Installation de SocketIO
```pip install --upgrade python-socketio==4.6.0```
```pip install --upgrade python-engineio==3.13.2```
```pip install --upgrade Flask-SocketIO==4.3.1```
 et sous Mac :
```pip3 install --upgrade python-socketio==4.6.0```
```pip3 install --upgrade python-engineio==3.13.2```
```pip3 install --upgrade Flask-SocketIO==4.3.1```

Mise à jour de l'environnement virtuel env (suite à installation):
```pip install -r requirements.txt```
```pip freeze > requirements.txt```
 et sous Mac :
```pip3 install -r requirements.txt```
```pip3 freeze > requirements.txt```

Activation de virt-env :
```source virt-env/bin/activate```




## Initialiser la base de données du projet et à chaque màj de la db:
```flask init_db```

Lancer le projet :
```flask run```


## Après une màj du back, suite à Git pull dans ./blablapp-back/
```git pull```

Installation des dépendances avec:
```pip install -r requirements.txt```
 et sous Mac :
```pip3 install -r requirements.txt```

Activation de virt-env :
```source virt-env/bin/activate```

###(Désactivation de virt-env :)
```deactivate```

Lancer le projet :
```flask run```


### Fichier pour ignorer les fichiers de virt-env à ne pas ajouter dans le Git :
```.gitignore```
### liste des fichiers à ignorer pour Git
```database/```
```__pycache__/```
```virt-env/```

### (Désactivation de virt-env :)
```deactivate```