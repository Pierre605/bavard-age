import React from 'react';
import './Chat.css';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

// console.log('http://' + document.domain + ':' + location.port)
// var socket = io.connect('http://' + document.domain + ':' + location.port);
// console.log('socket', socket)

//   socket.on( 'connect', function() {  // envoie un message à la fonction FLASK  
//     socket.emit( 'message sent', {
//       data: 'User Connected'} ) // renvoie la connexion d'un utilisateur
//       var form = $( 'form' ).on( 'submit', function( e ) { // empêcher l'envoi du formulaire afin de récupérer la valeur des champs
//         e.preventDefault()
//         let message = $( 'input.message' ).val()
//         if (message != ''){
//           socket.emit( 'message sent', {
//             username : username,
//             message : message,
//             chatroom : chatroom
//             })
//           }
//         $( 'input.message' ).val( '' )
//       })
//      })
  
//   socket.on( 'my response', function( msg ) {  // envoyer un message à toutes les sessions actives
//   console.log( msg )
//   if( typeof msg.username !== 'undefined' ) {
//     $( 'h3' ).remove()
//     // la ligne ci-dessous est à adapter selon l'affichage de vos messages
//     $( 'div.message_holder' ).append( 
//       '<div class="message"><b style="color:#000">'+msg.username+'</b> '+msg.message+'</div>'
//       )}
//     })

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
  }



  handleRegister(ev) {
    ev.preventDefault();
    console.log('Chat-handleRegister')
  
    const data = new FormData();
    data.append('username', this.username.value);
    data.append('message', this.email.value);

    fetch('http://localhost:5000/conversation/1', {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      // console.log(response.text());
      {this.props.close()};
      return response.text()
    })
    .then((data) => {
      console.log(data)
      if (data.includes('true')) {
        this.props.history.push('/conversations')
      }
      else {
        alert('Registration failed')
      }
    // window.location.reload(false);
  })
  }

  render() {
    
      return (
      <> 
        <h1 id="simple-modal-title">INSCRIVEZ VOUS</h1>
        <form onSubmit={this.handleRegister}>
          <div className="box">
            <label for="">Votre nom: </label>
            <input id="username" class="input" type="text" ref={(ref) => { this.username = ref; }} required />
            <label for="">Message: </label>
            <input ref={(ref) => { this.message = ref; }} type="text"name="" id="" cols="30" rows="10" required/>
          </div>
          <div className="button">
          <button>Envoyer</button>
          </div>
        </form>
      </>
      );
  }
}

export default Chat;