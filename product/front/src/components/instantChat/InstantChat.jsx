import React from 'react';
import "./InstantChat.css";
import "../messagesDisplay/MessagesDisplay.css"
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client/dist/socket.io';
const socket = io('http://localhost:5000/chat');

class InstantChat extends React.Component {
  constructor(props) {
    super(props);
    // Etat du composant
    this.state = ({ 
      chatroom : this.props.id,
      username: this.props.username,
      user_id: this.props.user,
      messages: [],  // liste des messages envoyés et reçus via Socket.IO
      
    })
    this.handleRegister = this.handleRegister.bind(this);
}

  
    componentWillReceiveProps(props) {
      this.setState({username: props.username,
                   user_id: props.user,
                   chatroom: props.id})
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.messages !== this.state.messages) {
        console.log("refresh !!")
        this.props.refresh()
        
    }
  }
  
  handleRegister(ev) {

      ev.preventDefault();
      console.log('Chat-handleRegister')
      let user = this.state.user_id
      console.log("user_id instantChat: ", user)

      console.log('chatroom - message à envoyer et envoyé socket front', this.state.chatroom, this.message.value, this.state.user_id, this.state.username);
      socket.emit( 'message sent', {
        user: this.state.user_id,
        message : this.message.value,
        chatroom : this.state.chatroom,
      });
      // $( 'input.message' ).val( '' )
    let newMessages = [...this.state.messages]
      newMessages.push(this.message.value)
      console.log('newMessages', newMessages)
      this.setState({messages: newMessages})
    
    socket.on( 'my response', function( msg ) {
      // envoyer un message à toutes les sessions actives
      console.log( msg )
      // let newMessages = [...this.state.messages]
      // newMessages.push(this.message.value)
      // console.log('newMessages', newMessages)
      // this.setState({messages: newMessages}) 
        })
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
        <div>
          <form onSubmit={this.handleRegister}>
            <div className="box" id={this.props.id}>
              <label for="">Message: </label>
              <input ref={(ref) => { this.message = ref; }} type="text"name="" id="" cols="30" rows="10" required/>
              <button className="button">Envoyer</button>
            </div>
          </form>
        </div>
      </>
      );
    }
}

export default InstantChat;
