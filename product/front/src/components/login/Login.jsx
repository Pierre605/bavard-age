import React from "react";
import "./Login.css";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  showRefContent = () => {
    console.log(this.textRef.value);
  };

  handleLogin(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("username", this.username.value);
    data.append("password", this.password.value);

    fetch("http://localhost:5000/login", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        let login = JSON.parse(data);
        console.log("login",login);
        console.log(typeof login);
        if (login[0].includes("true")) {
          this.props.history.push(`/${login[1]}/conversation-list`);
        } else {
          alert("Connection failed");
        }
        // window.location.reload(false);
      });
  }

  render() {
    return (
      <>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            my: "3rem",
            // py: "3rem",
          }}>
          <Typography
            sx={{
              letterSpacing: 1.6,
              fontSize: "2.4rem",
              fontWeight: "700",
              mb: "1.2rem",
            }}
            variant='h3'
            component='h2'
            color='primary'>
            Avec Bavard'Âge, restez en contact avec vos proches
          </Typography>
          <Container
            maxWidth='md'
            sx={{
              backgroundColor: "rgba(196,196,196, 0.5)",
              borderRadius: 1.5,
              pb: 4,
              mt: 2,
            }}>
            <form onSubmit={this.handleLogin}>
              <Box sx={{ pb: 2 }}>
                <FormControl margin='normal' fullWidth required>
                  <InputLabel sx={{ fontSize: "1.5rem" }} htmlFor='username'>
                    Entrez votre nom
                  </InputLabel>
                  <Input
                    sx={{ fontSize: "2rem" }}
                    id='username'
                    placeholder='Votre nom'
                    type='text'
                    inputRef={(ref) => {
                      this.username = ref;
                    }}
                    // required
                  />
                </FormControl>
                <FormControl margin='normal' fullWidth required>
                  <InputLabel sx={{ fontSize: "1.5rem" }} htmlFor='userpwd'>
                    Mot de passe
                  </InputLabel>
                  <Input
                    sx={{ fontSize: "2rem" }}
                    id='userpwd'
                    placeholder='Votre mot de passe'
                    type='text'
                    inputRef={(ref) => {
                      this.password = ref;
                    }}
                  />
                </FormControl>
              </Box>
              <Button
                sx={{
                  mt: 1.2,
                  fontWeight: "700",
                  lineHeight: 3,
                  fontSize: "1.6rem",
                }}
                fullWidth
                color='secondary'
                size='large'
                variant='contained'
                type='submit'>
                Se connecter
              </Button>
            </form>
          </Container>
        </Container>
      </>
    );
  }
}

export default withRouter(Login);
