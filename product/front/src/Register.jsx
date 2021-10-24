import React from 'react';
// import './Modal.css';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router-dom';
import './Register.css'

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
  }


  handleRegister(ev) {
    ev.preventDefault();
    console.log('toto')
  
    const data = new FormData();
    data.append('username', this.username.value);
    data.append('email', this.email.value);
    data.append('gdpr', this.rgpd.value)
    console.log(this.rgpd.value)
    if (this.password1.value === this.password2.value) {
      data.append('password', this.password2.value);
    

      fetch('http://localhost:5000/register', {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          // console.log(response.text());
          this.props.close();
          return response.text()
        })
        .then((data) => {
          console.log(data)
          if (data.includes('true')) {
            this.props.history.push('/conversation-list')
          }
          else {
            alert('Registration failed')
          }
        // window.location.reload(false);
      })
    }
    else {
      document.getElementById("warning-password").textContent = "Password not confirmed"
    }
  }

  render() {
    
      return (
      <> 
        <h1 id="simple-modal-title">INSCRIVEZ VOUS</h1>
        <form onSubmit={this.handleRegister}>
          <div className="box">
            <label for="">Votre nom: </label>
            <input id="username" class="input" type="text" ref={(ref) => { this.username = ref; }} required />
            <label for="">Email: </label>
            <input ref={(ref) => { this.email = ref; }} type="text"name="" id="" cols="30" rows="10" required/>
            <label for="">Password: </label>
            <input type="password" ref={(ref) => { this.password1 = ref; }} required/>
            <label for="">Confirm password: </label>
            <input type="password" ref={(ref) => { this.password2 = ref; }} required/>
          </div>
          <div>
            <input type="checkbox" ref={(ref) => { this.rgpd = ref; }} required value="true"/>
            <label className="rgpd-label" for="rgpd">Cochez cette case si vous acceptez le traitement automatisé de vos données par nos services, dans le strict respect de la réglementation en vigueur (RGPD)</label>
          </div>
          <div id ="warning-password"></div>
          <div className="button">
          <button>Envoyer</button>
          </div>
        </form>
      </>
      );
  }
}

export default withRouter(Register);