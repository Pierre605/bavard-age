import React from 'react';
import "./InstantChat.css";
import "../messagesDisplay/MessagesDisplay.css"
import io from 'socket.io-client/dist/socket.io';
let socket = io('http://localhost:5000/chat');

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


    componentDidMount() {
      console.log( "componentDidMount{socket}", socket )
    }

    componentDidUpdate(prevProps, prevState) {
      console.log( "componentDidUpdate{socket.on( 'my response')} ?" )
      socket.on( 'my response', function( msg ) {
        // envoyer un message à toutes les sessions actives
        console.log( "socket.on( 'my response')", msg.message )
        let newMsg = this.state.messages
        newMsg.append(msg.message)
        this.state.messages.setState(newMsg)
        console.log( 'msg.message', msg.message )
        })
      console.log( "componentDidUpdate{socket.on( 'my response')} !" )
      if (prevState.messages !== this.state.messages) {
        this.props.refresh()
      }
    }
  
  handleRegister(ev) {

      ev.preventDefault();
      console.log('Chat-handleRegister')
      let user = this.state.user_id
      console.log("user_id instantChat: ", user)
      console.log('handleRegister-socket', socket)

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
        // })
      // if( typeof msg.username !== 'undefined' ) {
        // $( 'h3' ).remove()
        // la ligne ci-dessous est à adapter selon l'affichage de vos messages
        // $( 'div.message_holder' ).append( 
        //   '<div class="message"><b style="color:#000">'+msg.username+'</b> '+msg.message+'</div>'
          // )}

  //   console.log('http://' + document.domain + ':' + location.port)
  //   var socket = io.connect('http://' + document.domain + ':' + location.port);
  //     console.log('socket', socket)
  
  // socket.on( 'connect', function() {  // envoie un message à la fonction FLASK  
  //     socket.emit( 'message sent', {
  //         data: 'User Connected'} ) // renvoie la connexion d'un utilisateur
  //         var form = $( 'form' ).on( 'submit', function( e ) { // empêcher l'envoi du formulaire afin de récupérer la valeur des champs
  //             e.preventDefault()
  //             let message = $( 'input.message' ).val()
  //             console.log('message', message)
  //             let username = $( 'input.username' ).val()
  //             console.log('username', username)              
  //             if (message != ''){
  //                 socket.emit( 'message sent', {
  //                     username : username,
  //                     message : message
  //                     } )}
  //             $( 'input.message' ).val( '' )              
  //         } )
  // } )
  
  // socket.on( 'my response', function( msg ) {  // envoyer un message à toutes les sessions actives
  // console.log( 'msg', msg )
  if( typeof msg.username !== 'undefined' ) {
      let newMsg = this.state.messages
      newMsg.append(msg.message)
      this.state.messages.setState(newMsg)
      console.log( 'msg.message', msg.message )
  }
  })

  }
// "sessions/${this.props.user}`}>
  render() {
    
      return (
      <> 

        <h1 id="simple-modal-title">CHATROOM</h1>
          <a className='list-conv' href={`http://localhost:5000/chat`}> 
                  Instant Chat
          </a>
          <div id='background'>
            {this.state.messages.map((message, i) => {
              return (
                  <h4>{i}{message}</h4>
              );
            })}
          </div>      
       { console.log( "render{socket.on( 'my response')} ?" ) }
      { console.log( "render{socket.on( 'my response')} !") }
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
