# BLAbl'@pp 
Notre projet Web Full-stack réalisé en équipe de 5 personnes durant 5 semaines.

## Équipe 3 (TF1) "BioWoMen"
Notre équipe de 5 forces pluri-disciplinaires et talentueuses :
#### Pierre Luciani
#### Thomas Kiener
#### Vanessa Combet
#### Aude Leegenhoek
#### Amine Houmad

----------------------------
# Bavard'Âge 
Notre product est une Web App en version MVP (Minimum Valuable Product).
Le Back-end tourne avec Flask, Python, Socket.io, SQLite3, SQL.
Le Front-end tourne avec React.js, Material UI...

Pour une première installation de Bavar'Âge (MVP), suivez le guide :

----------------------------
## Guide d'installation
### Cloner le repo GitLab (première fois),
- Récupérer Git clone, ensuite, se positionner dans le répertoire local du product
```
git clone https://gitlab.matrice.io/blablapp-react-426/tkiener-blablapp-react
cd tkiener-blablapp-react/product
```

----------------------------
### Passer en mode virt-env (option recommandée pour Flask)
- Créer virtualenv (première fois)
`pip install virtualenv` ou avec pip3 pour Mac :
```
pip3 install virtualenv
```
-   Créer virt-env (première fois)
```
virtualenv -p python3 virt-env
```
-   Activer virt-uel virtualenv (chaque fois)
Activation de virt-env :
```
source virt-env/bin/activate
```
> Le pompt change est précédé par ```(virt-env)```

----------------------------
### Installer les dépendances :
- Mettre à jour pip sous ```product/``` (première fois)
```
pip install --upgrade pip
```
- Mettre à jour les dépendances (première fois)

`pip install -r requirements.txt` ou avec pip3 pour Mac :
```
pip3 install -r requirements.txt
```
-  Vérifier les versions (première fois)
```
pip list
```
Requirements attendus :
```
Package Version

---
Package                           Version
--------------------------------- -------
Flask                             2.0.2
* Flask-SocketIO                * 4.3.1 <
itsdangerous                      2.0.1
Jinja2                            3.0.3
pip                               21.3.1
* python-engineio               * 3.13.2 <
* python-socketio               * 4.6.0 <
virtualenv                        20.9.0
Werkzeug                          2.0.2
```

----------------------------
### Installer Socket.io (si versions différentes)
-   Désinstaller les versions différentes (première fois)
```
pip uninstall -r requirements.txt python-socketio
pip uninstall -r requirements.txt python-engineio
pip uninstall -r requirements.txt Flask-SocketIO
```
_  / ou avec pip3 pour Mac :
```
pip3 uninstall -r requirements.txt python-socketio
pip3 uninstall -r requirements.txt python-engineio
pip3 uninstall -r requirements.txt Flask-SocketIO
```
- Installer SocketIO (première fois)
```
pip install --upgrade python-socketio==4.6.0
pip install --upgrade python-engineio==3.13.2
pip install --upgrade Flask-SocketIO==4.3.1
```
_  / ou avec pip3 pour Mac :
```
pip3 install --upgrade python-socketio==4.6.0
pip3 install --upgrade python-engineio==3.13.2
pip3 install --upgrade Flask-SocketIO==4.3.1
```

## Installer le Back-end
-   Se positionner dans `product/back/` (chaque fois)
### `cd back/`
-   Installer Flask CORS :
``` pip install -U flask-cors``` ou avec pip3 pour Mac :
```
pip3 install -U flask-cors
```
-   Exporter les variables Flask (chaque fois)
```
export FLASK_APP=app.py
export FLASK_ENV=development
```
#### Initialiser la database (première fois)
#### `flask init_db`
__________

### Lancer le projet (chaque fois)
### `flask run`
__________
### Fermer la porte en partant (chaque fois)
- Stopper le back-end 
#### `Ctrl + c`
- Désactiver virt-env (si activé)
#### ```deactivate```
__________

## Installer le Front-end
-   Se positionner dans ```product/front/``` (chaque fois)
### ```cd ../front/```
-   Installer npm
```
npm install
```
-   Installer React Router
```
npm install react-router-dom
```
-   Installer SocketIO client:
```
npm uninstall socket.io-client
npm i socket.io-client@2.3.1
```
-   Installer  Material-UI's (ANCIENNE VERSION MUI 4)

`npm install @material-ui/core @material-ui/icons @material-ui/icons-material @emotion/react @emotion/styled @fontsource/robot`
-   Installer  Material-UI's (NOUVELLE VERSION MUI 5)

`npm install @mui/material @emotion/react @emotion/styled @mui/styles @mui/icons-materia`

-   Prérequis MUI 5 dans index.html :
```
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>

```
___
### Démarrer du projet avec npm
### `npm start`
__________
### Fermer la porte en partant (chaque fois)
- Stopper le front-end 
#### `Ctrl + c`
__________

## Freezer les requirements (première fois)
`pip freeze > requirements.txt` ou avec pip3 pour Mac :
```
pip3 freeze > requirements.txt
```
____

## Gérer le git
### .gitignore
Dans certains répertoires sous `product/` le fichier `.gitignore` permet d'ignorer la liste des fichiers à ne pas ajouter dans le Git :
-   Liste des fichiers .gitignore :
```
product/.gitignore
product/back/.gitignore
product/back/app/.gitignore
product/front/.gitignore
```
-   liste des fichiers à ignorer pour Git
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

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
