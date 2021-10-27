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
import reportWebVitals from './reportWebVitals';
// Composants enfants
import HomePage from './HomePage.jsx';
import UserHome from './UserHome.jsx'
import Logout from './Logout';
import InConversation from './InConversation'
import Chat from './Chat'
import CreateConversation from './CreateConversation';


// Composant de classe App, principal de l'App React BLAblaPp
class App extends React.Component {

  // Rendu React du composant avec un Router et un switch
  render() {

    return (
      <Router>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/conversation-list" exact>
          <UserHome/>
        </Route>
        <Route path="/create-conversation" exact>
            <CreateConversation/>
        </Route>
        <Route path="/conversation/:id" exact component={InConversation}/> 
      </Router>      
    );
  }              
}

export default App;
