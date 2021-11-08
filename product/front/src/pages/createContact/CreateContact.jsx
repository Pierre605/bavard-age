import React from "react";
import { withRouter } from "react-router-dom";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import "./CreateContact.css";
import NavBar from "../../components/navBar/NavBar.js";


class CreateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactEMAIL: "",
    };

    this.createContact = this.createContact.bind(this);
  }

  createContact(ev) {
    ev.preventDefault();

    let data = new FormData();

    let newContactEMAIL = [...this.state.contactEMAIL];
    newContactEMAIL = this.email.value;
    this.setState({ imageEMAIL: newContactEMAIL });

    data.append("email", newContactEMAIL);

    fetch("http://localhost:5000/create_contact", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let created_contact = data["contact_created"]["result"];
        console.log(created_contact);
        console.log(typeof created_contact);
        if (created_contact === true) {
          this.props.history.push("/conversation-list");
        } else {
          alert("Echec de la création du contact");
        }
        // window.location.reload(false);
      });
  }

  render() {
    return (
      <>     
        <HeaderLogout />
        <form onSubmit={this.createContact}>
          <div className='flex'>
            <div className='input-style'>
              <label htmlFor=''>Email du contact: </label>
              <input
                id='email'
                className='input'
                type='text'
                ref={(ref) => {
                  this.email = ref;
                }}
                required
              />
            </div>
          </div>
          <div className="create-contact-button">
            <button>Créer contact</button>
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(CreateContact);
