import React from "react";
import "./Chat.css";
import io from "socket.io-client/dist/socket.io";
const socket = io("http://localhost:5000/chat");

class Chat extends React.Component {
  constructor(props) {
    super(props);
    // Etat du composant
    this.state = {
      // conversation: {'user_id' : 2, 'conversation_id' : 2},  // dico des infos de la conversation cliquée
      messages: [], // liste des messages de la conversation cliquée
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  // fonction qui récupère les informations de la DB des messages de la conversation cliquée (qui matche avec l'id demandé)
  getMessages() {
    fetch("http://127.0.0.1:5000/conversation/" + this.props.match.params.id)
      .then((response) => response.json())
      .then(
        (result) => {
          console.log("App/Chat/getMessages", result, result[1], result[0][1]);
          // Sauvegarde de l'état du composant avec le résultat de la réponse parsée de la DB
          this.setState({
            conversation: { conversation_id: this.props.match.params.id },
            messages: result,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  // Le composant a été chargé
  componentDidMount() {
    this.getMessages(this.props.match.params.id);
  }

  // Le composant a été mis à jour
  componentDidUpdate() {}

  handleRegister(ev) {
    // socket.on( 'connection', (client) => {  // envoie un message à la fonction FLASK
    //   client.on('subscribeToChat', function() {
    //     console.log('client is subscribing to chat');
    //     socket.emit( 'sentMessage', {
    //       data: 'connectedUser'}  // renvoie la connexion d'un utilisateur
    //       // var form = $( 'form' ).on( 'submit', function( e ) { // empêcher l'envoi du formulaire afin de récupérer la valeur des champs
    //       //socket.on( 'submit', function( e ) { // empêcher l'envoi du formulaire afin de récupérer la valeur des champs
    //         e.preventDefault()
    //         let message = $( 'input.message' ).val()
    //         if (message != ''){
    //             socket.emit( 'message sent', {
    //                 username : username,
    //                 message : message,
    //                 chatroom : chatroom
    //                 } )}
    //         $( 'input.message' ).val( '' )
    //       })
    //   })
    // }

    ev.preventDefault();
    console.log("Chat-handleRegister");

    const data = new FormData();
    data.append("username", this.username.value);
    data.append("message", this.message.value);
    console.log("data", data);
    socket.emit("message sent", {
      username: data.username,
      message: data.message,
      chatroom: this.state.conversation,
    });
    // $( 'input.message' ).val( '' )

    // socket.on( 'my response', function( msg ) {
    //   // envoyer un message à toutes les sessions actives
    //   console.log( msg )
    //   // if( typeof msg.username !== 'undefined' ) {
    //     // $( 'h3' ).remove()
    //     // la ligne ci-dessous est à adapter selon l'affichage de vos messages
    //     // $( 'div.message_holder' ).append(
    //     //   '<div class="message"><b style="color:#000">'+msg.username+'</b> '+msg.message+'</div>'
    //     //   )}

    //   fetch('http://localhost:5000/chat', {
    //     method: 'POST',
    //     body: data,
    //   })
    //   .then((response) => {
    //     console.log(response.text());
    //     {this.props.close()};
    //     return response.text()
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     if (data.includes('true')) {
    //       this.props.history.push('/conversations')
    //     }
    //     else {
    //       alert('Registration failed')
    //     }
    //   // window.location.reload(false);
    // })
  }

  render() {
    return (
      <>
        <h1 id='simple-modal-title'>CHATROOM</h1>
        <div className='messages'>
          {this.state.conversation.conversation_id}
          {this.state.conversation.user_id}
          <ul>
            {this.state.messages.map((item) => (
              <li>
                Message: {item[1]}
                Posted by: {item[0]} on: {item[2]}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={this.handleRegister}>
          <div className='box' id={this.props.match.params.id}>
            <label for=''>Votre nom: </label>
            <input
              id='username'
              class='input'
              type='text'
              ref={(ref) => {
                this.username = ref;
              }}
              required
            />
            <label for=''>Message: </label>
            <input
              ref={(ref) => {
                this.message = ref;
              }}
              type='text'
              name=''
              id=''
              cols='30'
              rows='10'
              required
            />
          </div>
          <div className='button'>
            <button>Envoyer</button>
          </div>
        </form>
      </>
    );
  }
}

export default Chat;
