// import "./HomePage.css";
// import reactDom from 'react-dom';
import * as React from "react";
import { AppBar, Toolbar } from "@mui/material";
// Composants enfants
import Login from "../../components/login/Login";
import RegisterModal from "../../components/registerModal/RegisterModal";
import Image from "../../assets/famille.jpg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
  },
};

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
<<<<<<< HEAD
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
=======
      <Container
        maxWidth='sm'
        sx={{ width: "100vw" }}
        style={styles.paperContainer}>
      <div className='img_header'>
>>>>>>> 6dd0aebe513f21653d3ee0f4c7e212056b42907a
        <Login />
        <RegisterModal />
      </div>
    );
  }
}

export default HomePage;
