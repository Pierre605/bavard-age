import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { AppBar, Typography, Toolbar } from "@mui/material";
// Composants enfants
// import NavBar from "./components/navBar/NavBar.js";
// import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import UserHomePage from "./pages/userHomePage/UserHomePage";
import InConversation from "./pages/InConversation/InConversation";
import CreateConversation from "./pages/createConversation/CreateConversation";
import CreateContact from "./pages/createContact/CreateContact";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Footer from "./components/footer/Footer";
import Typography from "@mui/material/Typography";

// Composant de classe App, principal de l'App React BLAblaPp
class App extends React.Component {
  // Rendu React du composant avec un Router
  render() {
    return (
      <>
<<<<<<< HEAD
=======
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='title'>
              <a href='/'>
                <img src='/logo.png' width='100px' alt='logo-provisoire' />
              </a>
            </Typography>
            {/* <NavBar /> */}
          </Toolbar>
        </AppBar>
>>>>>>> 6dd0aebe513f21653d3ee0f4c7e212056b42907a
        <Router>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/conversation-list' exact>
            <UserHomePage />
          </Route>
          <Route path='/create-conversation' exact>
            <CreateConversation />
          </Route>
          <Route path='/create-contact' exact>
            <CreateContact />
          </Route>
          <Route path='/conversation/:id' exact component={InConversation} />
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
