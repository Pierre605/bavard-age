import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { AppBar, Typography, Toolbar } from "@mui/material";
// Composants enfants
// import NavBar from "./components/navBar/NavBar.js";
import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import UserHomePage from "./pages/userHomePage/UserHomePage";
import InConversation from "./pages/InConversation/InConversation";
import CreateConversation from "./pages/createConversation/CreateConversation";
import CreateContact from "./pages/createContact/CreateContact";

// Composant de classe App, principal de l'App React BLAblaPp
class App extends React.Component {
  // Rendu React du composant avec un Router
  render() {
    return (
      <>
        {/* <AppBar position='static'>
          <Toolbar>
            <Typography variant='title'>
              <a href='/'>
                <img src='/logo2.png' width='100px' alt='logo-provisoire' />
              </a>
            </Typography>
            <NavBar />
          </Toolbar>
        </AppBar> */}
        <Router>
          <Route path='/' exact>
            <HomePage />
          </Route>
          
          <Route path='/:user_id/conversation-list' exact render={(props) => <UserHomePage {...props} />}/>
            
          <Route path='/:user_id/create-conversation' exact render={(props) => <CreateConversation {...props} />}/>

          <Route path='/:user_id/create-contact' exact render={(props) => <CreateContact {...props} />}/>

          <Route
            path='/:user_id/conversation/:id'
            exact
            render= {(props) => <InConversation {...props}/>}
          />
        </Router>
      </>
    );
  }
}

export default App;
