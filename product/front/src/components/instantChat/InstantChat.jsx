import React from "react";
import "./InstantChat.css";
import "../messagesDisplay/MessagesDisplay.css";
import io from "socket.io-client/dist/socket.io";
const socket = io("http://localhost:5000/chat");

class InstantChat extends React.Component {
  constructor(props) {
    super(props);
    // Etat du composant
    this.state = {
      chatroom: this.props.id,
      username: this.props.username,
      user_id: this.props.user,
      messages: [], // liste des messages envoyés et reçus via Socket.IO
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      username: props.username,
      user_id: props.user,
      chatroom: props.id,
    });
  }

  handleRegister(ev) {
    ev.preventDefault();
    socket.emit("message sent", {
      user: this.state.user_id,
      message: this.message.value,
      chatroom: this.state.chatroom,
    });
    // $( 'input.message' ).val( '' )
    let newMessages = [...this.state.messages];
    newMessages.push(this.message.value);
    this.setState({ messages: newMessages });
    this.props.refresh();
    let input_clear = document.getElementById("message-input");
    input_clear.value = "";

    socket.on("my response", function (msg) {});
  }

  render() {
    return (
      <>
        <h1 id='simple-modal-title'>CHATROOM</h1>
        <div style={{ height: "33vh" }}>
          <form onSubmit={this.handleRegister}>
            <div className='box' id={this.props.id}>
              <label for=''>Message: </label>
              <input
                ref={(ref) => {
                  this.message = ref;
                }}
                type='text'
                name=''
                id='message-input'
                cols='30'
                rows='10'
                required
              />
              <button className='button'>Envoyer</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default InstantChat;
