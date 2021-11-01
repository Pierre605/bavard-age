import React from "react";
import "./Login.css";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
} from "@mui/material";
import { withRouter } from "react-router-dom";
import { Box } from "@mui/system";

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
        let login = data;
        console.log("login", login);
        console.log(typeof login);
        if (login.includes("true")) {
          this.props.history.push("/conversation-list");
        } else {
          alert("Connection failed");
        }
        // window.location.reload(false);
      });
  }

  render() {
    return (
      <>
        <Typography variant='h3' component='h1' color='primary'>
          Page de connexion
        </Typography>
        <Box>
          <Typography variant='h4' component='h2' color='primary'>
            Connectez-vous
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 20,
              padding: 20,
            }}>
            <form onSubmit={this.handleLogin}>
              <FormControl margin='normal' fullWidth required>
                <InputLabel htmlFor='username'>Nom</InputLabel>
                <Input
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
                <InputLabel htmlFor='userpwd'>Mot de passe</InputLabel>
                <Input
                  id='userpwd'
                  type='text'
                  inputRef={(ref) => {
                    this.password = ref;
                  }}
                />
              </FormControl>

              <Button size='small' fullWidth variant='contained' type='submit'>
                Envoyer
              </Button>
            </form>
          </div>
        </Box>
      </>
    );
  }
}

export default withRouter(Login);
