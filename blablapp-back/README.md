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
```pip3 install -U flask-cors```
Installation de SocketIO
```pip3 install flask-socketio```

## Initialiser la base de données du projet et à chaque màj de la db:
```flask init_db```

Lancer le projet :
```flask run```


## Après une màj du back, suite à Git pull dans ./blablapp-back/
```git pull```

Activation de virt-env :
```source virt-env/bin/activate```

Installation des dépendances avec:
```pip install -r requirements.txt```
 et sous Mac :
```pip3 install -r requirements.txt```

 Initier les variables Flask
```export FLASK_APP=app.py```
```export FLASK_ENV=development```

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
