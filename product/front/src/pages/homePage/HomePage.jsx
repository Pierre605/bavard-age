import "./HomePage.css";
// import reactDom from 'react-dom';
import * as React from "react";
import { AppBar, Toolbar } from "@mui/material";
// Composants enfants
import Login from "../../components/login/Login";
import RegisterModal from "../../components/registerModal/RegisterModal";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
  }

  // Rendu React du composant
  render() {
    return (
      <div className='homepage'>
        <AppBar position='static'>
          <Toolbar
            sx={{
              backgroundColor: "#fff",
            }}>
            <a href='/'>
              <img src='/logotxt.png' width='310' alt='logo BavardAge' />
            </a>
          </Toolbar>
        </AppBar>
        <Login />
        <RegisterModal />
      </div>
    );
  }
}

export default HomePage;
