import * as React from "react";
import { AppBar, Box } from "@mui/material";
// Composants enfants
import Login from "../../components/login/Login";
import RegisterModal from "../../components/registerModal/RegisterModal";
import Image from "../../assets/famille.jpg";

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
        <AppBar
          position='static'
          sx={{
            backgroundColor: "#fff",
          }}>
          <a href='/'>
            <img
              src='/logotxt.png'
              width='310'
              alt='logo BavardAge'
              style={{ marginLeft: "2.4rem" }}
            />
          </a>
        </AppBar>
        <Box
          maxWidth='xl'
          sx={{
            backgroundSize: "cover",
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1),rgba(255, 255, 255, 0.4)), url(${Image})`,
          }}>
          <Login />
          <RegisterModal />
        </Box>
      </div>
    );
  }
}

export default HomePage;
