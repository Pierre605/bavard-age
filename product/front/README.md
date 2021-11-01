# BLAblaPp Front-end project with React.js, Material UI, & Co

## Première installation de la version product du front

### Prérequis :

> se positionner dans le répertoire local du front-end du product :

# product/front/

## Installation de npm, React Router, SocketIO client, Material-UI's:

```
npm install
npm install react-router-dom
npm uninstall socket.io-client
npm i socket.io-client@2.3.1
```

### ANCIENNE VERSION MUI 4

npm install @material-ui/core @material-ui/icons @material-ui/icons-material @emotion/react @emotion/styled @fontsource/roboto

## MUI V5 changement majeur

```
npm install @mui/material @emotion/react @emotion/styled @mui/styles @mui/icons-material

```

et insérer dans index.html :

```

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>

```

## Démarrage du projet avec npm

`npm start`

## Après une màj du front, suite à Git pull dans product/front

`git pull`

### Activation de virt-env :

`source virt-env/bin/activate`

> Le prompt change, et l'env virtuel apparaît en premier : `(virt-env)`

### Lancer le projet :

`npm start`

## Pour stopper le front-end :

`Ctrl + C`

### (Désactivation de virt-env :)

`deactivate`
