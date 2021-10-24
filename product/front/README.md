# BLAblaPp Front-end project with React.js, Material UI, & Co

## Première installation, suite à Git clone
```git clone https://gitlab.matrice.io/blablapp-react-426/tkiener-blablapp-react):```

Activation de virtualenv :
> Le pompt change, et l'env virtuel apparaît (virt-env)


Fichier pour ignorer les fichiers de virt-env à ne pas ajouter dans le Git :
```.gitignore```
liste des fichiers à ignorer pour Git
```_node_modules/```

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


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Installation de npm :
```npm install```

## Installation de React Router :
```npm install react-router-dom```

## Installation de Socket.io :
```npm install socket.io-client```

## Installation Material-UI's source files :
```npm install @material-ui/core```
```npm install @material-ui/icons```

## Installation de la police ? de Material-UI's :
```npm install @fontsource/?```

## Démarrage du projet avec npm
### `npm start`


## Après une màj du back, suite à Git pull dans ./bavardage-front-product/
```git pull```

Activation de virt-env :
```source virt-env-front/bin/activate```

### `npm start`

### CTL+C pour stopper le Front-end

### Mise à jour de l'environnement virtuel env (suite à installation):
```cd ..```
```pip freeze > requirements.txt```
 et sous Mac :
```pip3 freeze > requirements.txt```

### (Désactivation de virt-env :)
```deactivate```
