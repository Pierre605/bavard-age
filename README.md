# BLAblaPp project Back-end side with Flask, Python, SQLite3, SQL

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


# BLAblaPp Front-end project with React.js, Material UI, & Co

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


Fichier pour ignorer les fichiers de virt-env à ne pas ajouter dans le Git :
```.gitignore```
liste des fichiers à ignorer pour Git
```_node_modules/```
```virt-env/```

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation de React Router :
```npm install react-router-dom```

## Installation Material-UI's source files :
```npm install @material-ui/core```
```npm install @material-ui/icons```

## Installation Material-UI's Cooper font source files :
```npm install @fontsource/cooper-hewitt```

## Available Scripts

In the project directory, you can run:

### `npm start`


## Après une màj du back, suite à Git pull dans ./blablapp-front/
```git pull```

### `npm start`



### Fichier pour ignorer les fichiers de virt-env à ne pas ajouter dans le Git :
```.gitignore```
### liste des fichiers à ignorer pour Git
```blablapp-back/database/```
```blablapp-back/__pycache__/```
```blablapp-back/virt-env/```
```blablapp-front/node_modules/```
```blablapp-front/virt-env/```

### (Désactivation de virt-env :)
```deactivate```
