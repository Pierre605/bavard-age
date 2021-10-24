import React from 'react';
import './Login.css';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }


  handleLogin(ev) {
    ev.preventDefault();
  
    const data = new FormData();
    data.append('username', this.username.value);
    data.append('password', this.password.value);

    fetch('http://localhost:5000/login', {
    method: 'POST',
    body: data,
  })
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    let login = data
    console.log(login)
    console.log(typeof login)
    if (login.includes('true')) {
      this.props.history.push('/conversation-list')
    }
    else {
      alert('Connection failed')
    }
    // window.location.reload(false);
  });
  }

  render() {
    
      return (
      <> 
        <h1>CONNEXION</h1>
        <form onSubmit={this.handleLogin}>
          <div>
            <label for="">Votre nom: </label>
            <input id="username" class="input" type="text" ref={(ref) => { this.username = ref; }} required />
            <label for="">Password: </label>
            <input ref={(ref) => { this.password = ref; }} required></input>
          </div>
          <div>
          <button>Envoyer</button>
          </div>
        </form>
      </>
      );
  }
}

export default withRouter(Login);