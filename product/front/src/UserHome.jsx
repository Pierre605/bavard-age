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
import Logout from './Logout';
import ConversationsByRows from './ConversationsByRows';
import Header from './Header'


class UserHome extends React.Component {
  constructor(props) {
    super(props);
    // Etat du composant
    this.state = {
      // liste des conversations de l'utilisateur connecté
      conversations: [],
    }
  }

  componentDidMount() {
    this.getConversations()
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
        conversations : convers_list.conversations
      });
          }, (error) => {
            this.setState({
              error
            });
          }
      )
  };


  // Rendu React du composant
  render() {

    return (
        <>
        <Header />
        <section>
          <div>Conversations:</div>
            {this.state.conversations.map((conv) => {
              return (
                <ConversationsByRows id={conv.id} name={conv.name} />
                )
              })
            }
            
        </section>
        </>
      );
    
  }
}

export default UserHome;
