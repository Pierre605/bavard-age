import React from 'react';
import "./InstantChat.css";
import "../messagesDisplay/MessagesDisplay.css"
// import { Redirect } from 'react-router';
// import { withRouter } from 'react-router-dom';
import io from 'socket.io-client/dist/socket.io';
const socket = io('http://localhost:5000/chat');

class InstantChat extends React.Component {
  constructor(props) {
    super(props);
    // Etat du composant
    this.state = ({ 
      chatroom : this.props.id,  // conversation ouverte
      messages: [],  // liste des messages envoyés et reçus via Socket.IO
      username: this.props.username,
    })
    this.handleRegister = this.handleRegister.bind(this);
  }


  // Le composant a été mis à jour
  componentDidUpdate() {
    console.log( 'componentDidUpdate - my response')
    socket.on( 'my response', function( msg ) {
      // envoyer un message à toutes les sessions actives
      console.log( 'my response', msg )
      let newMessages = [...this.state.messages]
      newMessages.push(this.message.value)
      console.log('newMessages', newMessages)
      this.setState({messages: newMessages}) 
    })
  }
  
  handleRegister(ev) {

      ev.preventDefault();
      console.log('Chat-handleRegister')

      console.log('chatroom - message à envoyer et envoyé socket front', this.state.chatroom, this.message.value);
      socket.emit( 'message sent', {
        message : this.message.value,
        chatroom : this.state.chatroom
      });
      // $( 'input.message' ).val( '' )
    let newMessages = [...this.state.messages]
      newMessages.push(this.message.value)
      console.log('newMessages', newMessages)
      this.setState({messages: newMessages})
      this.setState({username: this.props.username})
    

      // if( typeof msg.username !== 'undefined' ) {
        // $( 'h3' ).remove()
        // la ligne ci-dessous est à adapter selon l'affichage de vos messages
        // $( 'div.message_holder' ).append( 
        //   '<div class="message"><b style="color:#000">'+msg.username+'</b> '+msg.message+'</div>'
          // )}

  }

  render() {
    
      return (
      <> 

        <h1 id="simple-modal-title">CHATROOM</h1>
        {this.state.messages.map((message) => {
          return (
            <div className="contain-messages-user">
                <div className="author-user">{this.state.username}</div>
                <div className="aside">
                    <div className="user-messages">
                        <div className="content">{message}</div>
                    </div>
                </div>
            </div>
          )
        })}     
 
        <form onSubmit={this.handleRegister}>
          <div className="box" id={this.props.id}>
            <label for="">Message: </label>
            <input ref={(ref) => { this.message = ref; }} type="text"name="" id="" cols="30" rows="10" required/>
            <button className="button">Envoyer</button>
          </div>
        </form>
      </>
      );
    }
}

export default InstantChat;
