# BLAblaPp est un projet Web Full-stack

## Première installation de la version product (MVP: Minimum Valuable Product)
### Premièrement (une seule fois), récupérer Git clone, ensuite, se positionner dans le répertoire local du product
```
git clone https://gitlab.matrice.io/blablapp-react-426/tkiener-blablapp-react
cd tkiener-blablapp-react/product
```
# Environnement virtuel
L'étape suivante est optionnelle,
mais il est fortement recommendé d'utiliser un env virtuel pour flask.
## Première installation (une seule fois), créer d'un environnement virtuel
Installation de virtualenv :
```pip install virtualenv```
 et sous Mac :
```pip3 install virtualenv```
## Première installation (une seule fois), créer de l'environnement virtuel env :
```virtualenv -p python3 virt-env``` OU alors ```python3 -m virt-env env```
## Ensuite (toutes les fois), Activer l' environnement virtuel
Activation de virt-env :
```source virt-env/bin/activate``` > Le pompt change, et l'env virtuel apparaît en premier : ```(virt-env)```
## Mettre à jour pip et vérifier le contenu des versions de bibliothèque
```
pip install --upgrade pip
pip list
>
Package Version

---
Flask 2.0.1
itsdangerous 2.0.1
Jinja2 3.0.1
MarkupSafe 2.0.1
pip 21.2.4
pkg_resources 0.0.0
setuptools 44.0.0
Werkzeug 2.0.1
```
FIN de la partie optionnelle
----------------------------
## .gitignore
Fichiers pour ignorer les fichiers de virt-env à ne pas ajouter dans le Git,
depuis le répertoire racine :
```subl .gitignore```
liste des fichiers à ignorer pour Git
```
/node_modules
/.pnp
.pnp.js

# database
/database

# virtual environment
/virt-env

# testing
/coverage

# production
/build

# misc
/__pycache__
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```
... aussi, bien qu'inutile (à supprimer), dans le répertoire produit :
```subl product/.gitignore```
liste des fichiers à ignorer pour Git
```
virt-env/
back/database/
back/__pycache__/
back/app/__pycache__/
front/node_modules/
```
... et aussi, dans le répertoire back-end :
```subl product/back/.gitignore```
liste des fichiers à ignorer pour Git
```
database/
__pycache__/
app/__pycache__/
```
... et encore, dans le répertoire app du back-end :
```subl product/back/app/.gitignore```
liste des fichiers à ignorer pour Git
```
__pycache__/
```
... et enfin, dans le répertoire front-end :
```subl product/front/.gitignore```
liste des fichiers à ignorer pour Git
```
node_modules/
```
## Installation des dépendances :
```pip install -r requirements.txt```
 et sous Mac :
```pip3 install -r requirements.txt```

## Installation de Socket.io 
### Vérification de la version installée
```
pip list
>
Package         Version
--------------- -------
...
Flask-SocketIO  4.3.1
...
python-engineio 3.13.2
python-socketio 4.6.0
...
```
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

## Installation de la partie Back-end
```cd back/```
### Première installation (une seule fois) du projet back-end :
```subl README.md```
Suivre le contenu du README.md

### Instancier les variables Flask
```
export FLASK_APP=app.py
export FLASK_ENV=development
```

### Première fois (une seule fois),
### Initialiser la base de données du projet à la première installation,
### Ensuite à chaque mise à jour du schéma de la database (si modif UML):
```flask init_db```
### Lancer le projet back-end :
```flask run```

### Pour stopper le back-end :
`Ctrl + c` puis 

## Installation de la partie Front-end
### Dans le répertoire front-end du product
```cd ../front/```

## Installer l'environnement du projet front-end (1ère fois):
```subl README.md```

### `npm start`
## Pour stopper le back-end :
`Ctrl + C`

## Mise à jour de l'environnement virtuel env (suite à installation):
```pip freeze > requirements.txt```
 et sous Mac :
```pip3 freeze > requirements.txt```
## Désactivation de l'environnement virtuel
`deactivate` pour sortir de son environnement virtuel.
