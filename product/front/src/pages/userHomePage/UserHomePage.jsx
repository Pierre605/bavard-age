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
      // liste des conversations de l'utilisateur connecté
      conversations: [],
      // liste des contacts de l'utilisateur connecté
      contacts: [],
    };
  }

  componentDidMount() {
    this.getConversations();
    this.createConvMouseOver();
    this.createContactMouseOver();
  }

  getConversations = () => {
    fetch("http://localhost:5000/conversation-list")
      .then((response) => {
        return response.json();
      })
      .then(
        (convers_list) => {
          console.log("UserHome/getConversations/convers_list", convers_list);
          // Sauvegarde de l'état du composant avec le résultat de la réponse parsée de la DB
          this.setState({
            conversations: convers_list.conversations,
            contacts: convers_list.contacts,
          });
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

  // Rendu React du composant
  render() {
    return (
      <>
      <div id="myHeader">
        <HeaderLogout />
      </div>
        <div className='flex-aside'>
          <div className='side-bar'>
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
                <a href='http://localhost:3000/create-contact'>
                  <img
                    id='create-contact'
                    src='/addcontact.png'
                    alt='Cliquer pour créer un contact'
                  />
                </a>
                <div id='create-contact-msg'></div>
              </div>
          </div>
          <div className="conversation-list">
            <div>Conversations :</div>
            {this.state.conversations.map((conv, i) => {
              return (
                <ConversationsDisplay key={i} id={conv.id} name={conv.name} />
              );
            })}
            <div id='create-conv-container'>
              <a href='http://localhost:3000/create-conversation'>
                <img
                  id='create-conv'
                  src='/convers-icon.png'
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
