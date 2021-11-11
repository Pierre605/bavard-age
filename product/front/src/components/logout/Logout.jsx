import React from "react";
// import './Logout.css';
import { withRouter } from "react-router-dom";
import './Logout.css'

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  // componentDidMount() {
  //   window.addEventListener("beforeunload", this.handleLogout(), false);
  // }

  handleLogout(ev) {
    ev.preventDefault();

    fetch("http://localhost:5000/"+ this.props.user + "/logout")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        let logout = data;
        console.log(logout);
        if (logout.includes("true")) {
          this.props.history.push("/");
        } else {
          alert("Disconnection failed");
        }
        // window.location.reload(false);
      });
  }


  render() {
    return (
      <>
        <a href=""><img className="deconnection-pic" src="/se_deconnecter.png" onClick={this.handleLogout}/></a>
      </>
    );
  }
}

export default withRouter(Logout);
