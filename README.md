# BLAblaPp est un projet Web Full-stack

## Première installation, suite à Git clone
```git clone https://gitlab.matrice.io/blablapp-react-426/tkiener-blablapp-react):```

# Petits rappels d'installation pour Flask

L'étape suivante est optionnelle, mais il est fortement recommendé d'utiliser un env virtuel pour flask.

## Créer un environnement virtuel
Création de l'environnement virtuel env :
```virtualenv -p python3 virt-env```
Activation de virt-env-back :
```source virt-env/bin/activate```

OU encore :
```python3 -m virt-env env```

> Le pompt change, et l'env virtuel apparaît (virt-env)

## Mettre à jour pip
```pip install --upgrade pip```
``` > pip list``` 
devrait voir qqch qui ressemble à :

```
Package Version

---
...
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
## .gitignore
Fichier pour ignorer les fichiers de virt-env à ne pas ajouter dans le Git :
```subl product/.gitignore```
liste des fichiers à ignorer pour Git
```product/virt-env/```

## Installation des dépendances avec :
```pip install -r requirements.txt```
 et sous Mac :
```pip3 install -r requirements.txt```

# Back-end
```cd product/back/```

## Installer l'environnement du projet back-end (1ère fois):
```subl README.md```

 Initier les variables Flask
```export FLASK_APP=app.py```
```export FLASK_ENV=development```

Initialiser la base de données du projet à la première installation:
```flask init_db```

Lancer le projet :
```flask run```

## Pour stopper le back-end :
`Ctrl + c` puis `deactivate` pour sortir de son environnement virtuel.

# Front-end
```cd product/front/```

## Installer l'environnement du projet front-end (1ère fois):
```subl README.md```

### `npm start`
