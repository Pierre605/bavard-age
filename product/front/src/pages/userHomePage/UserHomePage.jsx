import "./UserHomePage.css";
import "../../components/participantsDisplay/ParticipantsDisplay.css";
import React from "react";
import ConversationsDisplay from "../../components/conversationsDisplay/ConversationsDisplay";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import ContactsDisplay from "../../components/contactsDisplay/ContactsDisplay";

class UserHomePage extends React.Component {
  constructor(props) {
    super(props);
    // Etat du composant
    this.state = {
      conversations: [],
      contacts: [],
      user_id: [],
      username: [],
    };
    this.getConversations = this.getConversations.bind(this);
  }

  componentDidMount() {
    console.log("params: ", this.props.match.params.user_id);
    this.getConversations();
    this.createConvMouseOver();
    this.createContactMouseOver();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user_id !== this.state.user_id) {
      this.setHref();
    }
  }

  getConversations = () => {
    fetch(
      "http://localhost:5000/" +
        this.props.match.params.user_id +
        "/conversation-list"
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (convers_list) => {
          console.log("UserHome/getConversations/convers_list", convers_list);
          console.log(
            "UserHome/getConversations/convers_list",
            typeof convers_list
          );
          if (convers_list["contacts"]) {
            this.setState({
              conversations: convers_list.conversations,
              contacts: convers_list.contacts,
              user_id: convers_list.user_id,
              username: convers_list.username,
             })
          }
          else {
            alert("User not connected")
          }
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  };

  createContactMouseOver() {
    let createContactIcon = document.getElementById("create-contact");
    createContactIcon.addEventListener(
      "mouseover",
      function (event) {
        // on met l'accent sur la cible de mouseover
        let div = (document.getElementById("create-contact-msg").textContent =
          "Créer un contact");

        createContactIcon.addEventListener("mouseleave", function (e) {
          let div = (document.getElementById("create-contact-msg").textContent =
            "");
        });
      },
      false
    );
  }

  createConvMouseOver() {
    let createIcon = document.getElementById("create-conv");
    createIcon.addEventListener(
      "mouseover",
      function (event) {
        // on met l'accent sur la cible de mouseover
        let div = (document.getElementById("create-mssg").textContent =
          "Créer une conversation");

        createIcon.addEventListener("mouseleave", function (e) {
          let div = (document.getElementById("create-mssg").textContent = "");
        });
      },
      false
    );
  }

  setHref = () => {
    document.getElementById(
      "cr-cont"
    ).href = `/${this.state.user_id}/create-contact`;
    document.getElementById(
      "cr-conv"
    ).href = `/${this.state.user_id}/create-conversation`;
  };

  // Rendu React du composant
  render() {
    return (
      <>
        <div id='myHeader'>
          <HeaderLogout user={this.state.user_id} />
          <div className="welcome">Bienvenue <b>{this.state.username}</b> !</div>
        </div>
        <div className='flex-aside'>
          <div className='side-bar-home'>
            <div>Contacts :</div>
            {this.state.contacts.map((member, i) => {
              return (
                <ContactsDisplay
                  key={i}
                  id={member.contact_id}
                  username={member.username}
                  email={member.email}
                />
              );
            })}
            <div id='create-contact-container'>
              <a id='cr-cont' href=''>
                <img
                  id='create-contact'
                  src='/creer_un_contact_1.png'
                  alt='Cliquer pour créer un contact'
                />
              </a>
              <div id='create-contact-msg'></div>
            </div>
          </div>
          <div className='conversation-list'>
            <div className="title">Conversations :</div>
            {this.state.conversations.map((conv, i) => {
              return (
                <ConversationsDisplay
                  key={i}
                  id={conv.id}
                  name={conv.name}
                  user_id={this.state.user_id}
                />
              );
            })}
            <div id='create-conv-container'>
              <a id='cr-conv' href=''>
                <img
                  id='create-conv'
                  src='/creer_une_conversation-2.png'
                  alt='Cliquer pour créer une conversation'
                />
              </a>
              <div id='create-mssg'></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserHomePage;
