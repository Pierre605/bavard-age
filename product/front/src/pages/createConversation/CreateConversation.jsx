import React from "react";
import { withRouter } from "react-router-dom";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import "./CreateConversation.css";

class CreateConversation extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   username: ''
    // }

    this.createConversation = this.createConversation.bind(this);
  }

  createConversation(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("email", this.emails.value);
    data.append("name", this.name.value);

    fetch("http://localhost:5000/create_conversation", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        let created_conv = data;
        console.log(created_conv);
        console.log(typeof created_conv);
        if (created_conv.includes("conversation_id")) {
          this.props.history.push("/conversation-list");
        } else {
          alert("Echec de la création de la conversation");
        }
        // window.location.reload(false);
      });
  }

  render() {
    return (
      <>
        <HeaderLogout />
        <form onSubmit={this.createConversation}>
          <div className='flex'>
            <div className='input-style'>
              <label htmlFor=''>Emails des participants : </label>
              <input
                id='emails'
                className='input'
                type='text'
                ref={(ref) => {
                  this.emails = ref;
                }}
                required
              />
              <div id='emails-syntaxe-requirement'>
                Si plusieurs adresses, les séparer par des virgule espace:
                julien@blabla.fr, laura@blabla.fr, ...
              </div>
            </div>
            <div className='input-style'>
              <label htmlFor=''>Nom de la conversation : </label>
              <input
                type='text'
                ref={(ref) => {
                  this.name = ref;
                }}
                required></input>
            </div>
          </div>
          <div>
            <button>Créer une conversation</button>
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(CreateConversation);
