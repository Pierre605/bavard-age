import './UserHome.css';
import reactDom from 'react-dom';
// import * as React from 'react';
import React, { useState } from 'react'
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ConversationsByRows from './ConversationsByRows';
import Header from './Header'
import ContactsDisplay from './ContactsDisplay';


class UserHome extends React.Component {
  constructor(props) {
    super(props);
    // Etat du composant
    this.state = {
      // liste des conversations de l'utilisateur connecté
      conversations: [],
      // liste des contacts de l'utilisateur connecté
      contacts: [],
    }
  }

  componentDidMount() {
    this.getConversations()
    this.createConvMouseOver()
  }

  getConversations = () => {
    fetch('http://localhost:5000/conversation-list')
    .then(response => {
      return(
        response.json()
    )})
    .then(convers_list => {
      console.log('UserHome/getConversations/convers_list', convers_list)
      // Sauvegarde de l'état du composant avec le résultat de la réponse parsée de la DB
      this.setState({
        conversations : convers_list.conversations,
        contacts : convers_list.contacts
      });
          }, (error) => {
            this.setState({
              error
            });
          }
      )
  };
  
  createConvMouseOver() {
    let createIcon = document.getElementById("create-conv");
    createIcon.addEventListener("mouseover", function( event ) {
      // on met l'accent sur la cible de mouseover
      let div = document.getElementById("create-mssg").textContent = "Créer une conversation"

      createIcon.addEventListener("mouseleave", function(e) {
        let div = document.getElementById("create-mssg").textContent = ""
      })
    }, false);
  }



  // Rendu React du composant
  render() {

    return (
        <>
        <Header />
          <div id="flex-aside">
            <div className="side-bar">
            {this.state.contacts.map((member) => {
              return (
                <ContactsDisplay id={member.id} username={member.username} email={member.email} />
              )
            })}
            </div>        
          <section>
            <div>Conversations:</div>
              {this.state.conversations.map((conv) => {
                return (
                  <ConversationsByRows id={conv.id} name={conv.name} />
                  )
                })
              }
            <div id="create-conv-container">
              <a href='http://localhost:3000/create-conversation'><img id="create-conv" src="/convers-icon.png"/></a>
              <div id="create-mssg"></div>
            </div>
          </section>
        </div>
        </>
      );
    
  }
}

export default UserHome;
