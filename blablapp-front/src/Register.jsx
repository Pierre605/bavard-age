import React from 'react';
import './Register.css';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router-dom';

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
    data.append('password', this.password.value);

    fetch('http://localhost:5000/register', {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      // console.log(response.text());
      {this.props.close()};
      return response.text()
    })
    .then((data) => {
      console.log(data)
      if (data.includes('true')) {
        this.props.history.push('/conversations')
      }
      else {
        alert('Registration failed')
      }
    // window.location.reload(false);
  })
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
            <input ref={(ref) => { this.password = ref; }} required/>
          </div>
          <div className="button">
          <button>Envoyer</button>
          </div>
        </form>
      </>
      );
  }
}

export default withRouter(Register);