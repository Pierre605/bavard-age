import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";


// Composant de classe App, principal de l'App React BLAblaPp
class App extends React.Component {
  constructor(props) {
    super(props)
    // Etat du composant
    this.state = ({
       data: [] // listes des données de la DB 
    })
  }

  // Fonction qui récupère les données de la DB
  getDBData = () => {
    fetch("http://127.0.0.1:5000/")
      .then(response => response.json())
      .then(
        (result) => {
          console.log('App/getDBData', result)
          // Sauvegarde de l'état du composant avec le résultat de la réponse parsée de la DB
          this.setState({
            data: result.data // listes des données de la DB 
            });
          }, (error) => {
            this.setState({
              error
            });
          }
      )
  };

  // Le composant a été chargé
  componentDidMount() {
    // Les photos sont récupérées
    this.getDBData();
  }

  // Le composant a été mis à jour
  componentDidUpdate() {
  }

  // Rendu React du composant avec un Router et un switch
  render() {
    return (
      <Router>
        <div className="container">
        <div className="nav">
          <Link to="/">
            <Typography variant="h6">Home</Typography>
          </Link>  
        </div>
      </div>
    </Router>
    );
  }              

}

  const Home = () => {
    return(
        <>
          <Link to="/">
          <Typography variant="h6">Back-end root road</Typography>
            <img className="homeButton" src="./img/logo.png" 
              alt="Root Road"></img>
          </Link>
        </>
      );
  };


export default App;
