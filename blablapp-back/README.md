# BLAblaPp project Back-end side with Flask, Python, SQLite3, SQL

Installation de virtualenv :
```pip install virtualenv```
 et sous Mac :
```pip3 install virtualenv```

Création de l'environnement virtuel env :
```virtualenv -p python3 virt-env```

Mise à jour de l'environnement virtuel env (suite à installation):
```pip3 install -r requirements.txt```
```pip3 freeze > requirements.txt```

Activation de virt-env :
```source virt-env/bin/activate```

Désactivation de virt-env :
```deactivate```



Fichier pour ignorer les fichiers de virt-env à ne pas ajouter dans le Git :
```.gitignore```
liste des fichiers à ignorer pour Git
```database/```
```__pycache__/```
```virt-env/```

Installation des dépendances avec:
```pip install -r requirements.txt```
 et sous Mac :
 ```pip3 install -r requirements.txt```
 Initier les variables Flask
```export FLASK_APP=app.py```
```export FLASK_ENV=development```
Installation de CORS :
```pip3 install -U flask-cors```

Initialiser la base de données du projet (1ère fois):
```flask init_db```

Lancer le projet :
```flask run```
