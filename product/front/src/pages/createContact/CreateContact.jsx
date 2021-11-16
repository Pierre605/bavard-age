import React from "react";
import { withRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import "./CreateContact.css";

class CreateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactEMAIL: "",
    };

    this.createContact = this.createContact.bind(this);
  }

  componentDidMount() {
    this.setLogoWithText();
  }

  createContact(ev) {
    ev.preventDefault();

    let data = new FormData();

    let newContactEMAIL = [...this.state.contactEMAIL];
    newContactEMAIL = this.email.value;
    this.setState({ imageEMAIL: newContactEMAIL });

    data.append("email", newContactEMAIL);

    fetch(
      "http://localhost:5000/" +
        this.props.match.params.user_id +
        "/create_contact",
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let created_contact = data["contact_created"]["result"];
        console.log(created_contact);
        console.log(typeof created_contact);
        if (created_contact === true) {
          this.props.history.push(
            `/${this.props.match.params.user_id}/conversation-list`
          );
        } else {
          alert("Echec de la création du contact");
        }
        // window.location.reload(false);
      });
  }

  setLogoWithText = () => {
    let logo = document.getElementById("home");
    logo.firstChild.src = "/retourner_a_laccueil.png";
    logo.firstChild.style = "width: 150px";
  };

  render() {
    return (
      <>
        <HeaderLogout user={this.props.match.params.user_id} />
        <Box
          sx={{
            height: "100vh",
          }}>
          <form
            className='conteneur'
            onSubmit={this.createContact}
            style={{ marginTop: "10rem" }}>
            <div className='flex'>
              <div className='input'>
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
            <div className='create-contact-button'>
              <button className='boutonCreationContact'>
                Créer un contact
              </button>
            </div>
          </form>
        </Box>
      </>
    );
  }
}

export default withRouter(CreateContact);
