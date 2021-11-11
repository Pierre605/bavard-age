import "./HomePage.css";
// import reactDom from 'react-dom';
import * as React from "react";
import { Container } from "@mui/material";
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
      <Container>
        <Login />
        <RegisterModal />
      </Container>
    );
  }
}

export default HomePage;
