import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
// Composants enfants
import HeaderHomePage from "../../components/headerHomePage/HeaderHomePage";
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
      <Container minWidth='sm' maxWidth='xl'>
        <HeaderHomePage />
        <Box
          component='main'
          sx={{
            backgroundSize: "cover",
            backgroundImage: `url(${Image})`,
          }}>
          <Login />
          <RegisterModal />
        </Box>
      </Container>
    );
  }
}

export default HomePage;
