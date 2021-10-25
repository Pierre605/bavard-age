import React from 'react';
import './Logout.css';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout(ev) {
    ev.preventDefault();

    fetch('http://localhost:5000/logout')
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    let logout = data
    console.log(logout)
    if (logout.includes('true')) {
      this.props.history.push('/')
    }
    else {
      alert('Disconnection failed')
    }
    // window.location.reload(false);
  });
  }

  render() {
    
    return (
      <> 
        <button onClick={this.handleLogout}>Deconnexion</button>
      </>
    );

  }
}

export default withRouter(Logout);