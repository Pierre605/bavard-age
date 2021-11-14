import React from "react";
import { withRouter } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Cancel from "@mui/icons-material/Cancel";
// import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { FormGroup } from "@mui/material";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(ev) {
    ev.preventDefault();
    console.log("toto");

    const data = new FormData();
    data.append("username", this.username.value);
    data.append("email", this.email.value);
    data.append("gdpr", this.rgpd.value);
    console.log(this.rgpd.value);
    if (this.password1.value === this.password2.value) {
      data.append("password", this.password2.value);

      fetch("http://localhost:5000/register", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          // console.log(response.text());
          this.props.close();
          return response.json();
        })
        .then((data) => {
          console.log(data[0], data[1]);
          if (data[0]['registered'] === true) {
            this.props.history.push(`/${data[1]}/conversation-list`);
          } else {
            alert("Registration failed");
          }
          window.location.reload(false);
        });
    } else {
      document.getElementById("warning-password").textContent =
        "Password not confirmed";
    }
  }

  render() {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: "0",
            px: "0",
          }}>
          <Typography
            sx={{ letterSpacing: "0.3rem" }}
            color='primary.contrastText'
            variant='h4'>
            S'inscrire
          </Typography>
          <Button sx={{ px: 0 }}>
            <Cancel
              sx={{ fontSize: "3.2rem", color: "#98Ac37" }}
              onClick={this.props.close}
            />
          </Button>
        </Box>
        {/* <h1 id='simple-modal-title'>INSCRIVEZ-VOUS</h1> */}
        <form onSubmit={this.handleRegister}>
          <Box sx={{ display: "flex", flexDirection: "column", color: "#fff" }}>
            {/* <div className='box'> */}
            <FormControl required>
              <InputLabel
                sx={{
                  borderColor: "#fff",
                  borderBottomWidth: "2px",
                  color: "#fff",
                }}
                htmlFor='register-username'>
                Nom
              </InputLabel>
              <Input
                sx={{ fontSize: "1.5rem", color: "#fff" }}
                id='register-username'
                name='register-username'
                type='text'
                inputRef={(ref) => {
                  this.username = ref;
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: "1rem" }} required>
              <InputLabel sx={{ color: "#fff" }} htmlFor='register-mail'>
                Email
              </InputLabel>
              <Input
                id='register-mail'
                name='register-mail'
                type='text'
                inputRef={(ref) => {
                  this.email = ref;
                }}
                sx={{ fontSize: "1.5rem", color: "#fff" }}
              />
            </FormControl>
            <FormControl sx={{ mt: "1rem" }} required>
              <InputLabel sx={{ color: "#fff" }} htmlFor='register-password1'>
                Mot de passe{" "}
              </InputLabel>
              <Input
                id='register-password1'
                name='register-password1'
                type='password'
                inputRef={(ref) => {
                  this.password1 = ref;
                }}
                sx={{ fontSize: "1.5rem", color: "#fff" }}
              />
            </FormControl>
            <FormControl sx={{ mt: "1rem" }} required>
              <InputLabel sx={{ color: "#fff" }} htmlFor='register-password2'>
                Confirmez votre mot de passe
              </InputLabel>
              <Input
                id='register-password2'
                name='register-password2'
                type='password'
                inputRef={(ref) => {
                  this.password2 = ref;
                }}
                sx={{ borderBottom: "#fff", fontSize: "1.5rem", color: "#fff" }}
              />
            </FormControl>
            {/* </div> */}
            {/* <div> */}
            {/* <FormGroup required> */}
            {/* <FormControlLabel
              control={
                <Checkbox
                  title='RGBD checkbox'
                  checked={this.props.checked}
                  onChange={this.props.onChange}
                  inputRef={(ref) => {
                    this.rgpd = ref;
                  }}
                  color='primary'
                  inputProps={{ "aria-label": "Accepter RGPD" }}
                />
              }
              label='Cochez cette case si vous acceptez le traitement automatisé de
                vos données par nos services, dans le strict respect de la
                réglementation en vigueur (RGPD)'
            /> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flexStart",
                gap: "1.2rem",
                mt: "0.8rem",
              }}>
              <input
                style={{
                  marginTop: "0.5rem",
                  marginLeft: "0.7rem",
                  background: "#98Ac37",
                }}
                id='register-rgpd'
                name='register-rgpd'
                type='checkbox'
                ref={(ref) => {
                  this.rgpd = ref;
                }}
                required
                value='true'
              />
              <label style={{ lineHeight: "1.2rem" }} htmlFor='register-rgpd'>
                Cochez cette case si vous acceptez le traitement de vos données
                par nos services, dans le strict respect de la réglementation en
                vigueur (RGPD)
              </label>
            </Box>
            {/* </FormGroup> */}
            {/* </div> */}
            <div id='warning-password'></div>
            {/* <div className='button'> */}
            <button
              style={{
                alignSelf: "center",
                backgroundColor: "#98Ac37",
                color: "#fff",
                margin: "0.7rem",
                padding: "0.5rem 3rem",
                fontSize: "1.5rem",
                fontWeight: "700",
                letterSpacing: "0.2rem",
                border: "none",
              }}>
              Envoyer
            </button>
            {/* </div> */}
          </Box>
        </form>
      </>
    );
  }
}

export default withRouter(Register);
