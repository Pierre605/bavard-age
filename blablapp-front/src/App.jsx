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
import Home from './Home.jsx';
import UserConnectedHome from './UserConnectedHome.jsx'
import reportWebVitals from './reportWebVitals';
import Logout from './Logout';
import Chat from './Chat';


// Composant de classe App, principal de l'App React BLAblaPp
class App extends React.Component {

  // Rendu React du composant avec un Router et un switch
  render() {
    return (
      <Router>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/conversations" exact>
          <UserConnectedHome/>
          <Logout />
        </Route>
        <Route path="/conversation/:id" exact component={Chat}/> 
      </Router>      
    );
  }              
}

export default App;
