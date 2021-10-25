# BLAblaPp project Back-end side with Flask, Python, Socket.io, SQLite3, SQL

## Première installation de la version product du back
### Prérequis : 
> se positionner dans le répertoire local du back-end du product : product/back/
> virtual env activé, le pompt affiche (virt-env)
### Petits rappels d'installation pour Flask
#### Installation de CORS :
```pip install -U flask-cors```
 et sous Mac :
```pip3 install -U flask-cors```
Instancier les variables Flask
```
export FLASK_APP=app.py
export FLASK_ENV=development
```
#### Initialiser la base de données du projet et à chaque màj de la db:
```flask init_db```
#### Lancer le projet :
```flask run```
### Pour stopper le back-end :
`Ctrl + c` puis 

## Après une màj du back, suite à Git pull dans product/back/
```git pull```
### Activation de virt-env :
```source virt-env/bin/activate```
> Le pompt change, et l'env virtuel apparaît en premier : ```(virt-env)```
### Lancer le projet :
```flask run```

### CTL+C pour stopper le Front-end

### (Désactivation de virt-env :)
```deactivate```
