import React from "react";
import MessagesDisplay from "../../components/messagesDisplay/MessagesDisplay";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import "./ConversationsDisplay.css";
import ParticipantsDisplay from "../../components/participantsDisplay/ParticipantsDisplay";

class ConversationsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], username: "", participants: [] };
    // this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount() {
    this.getConversation();
  }

  // handleRegister(ev) {
  // }

  getConversation = () => {
    fetch("http://localhost:5000/conversation/" + this.props.match.params.id)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const messages = JSON.parse(data);
        console.log("ici messages", messages);
        if (messages.includes("user not in this")) {
          alert("You are not part of this conversation");
        } else {
          this.setState({
            messages: messages[0],
            username: messages[1],
            participants: messages[2],
          });
        }
      });
  };

  // Rendu React du composant
  render() {
    return (
      <>
        <HeaderLogout />
        <div className='flex-aside'>
          <div className='side-bar'>
            {this.state.participants.map((member) => {
              return (
                <ParticipantsDisplay name={member} user={this.state.username} />
              );
            })}
          </div>
          <div className='background'>
            {this.state.messages.map((message, i) => {
              return (
                <MessagesDisplay
                  username={this.state.username}
                  id={i}
                  key={i}
                  author={message[0]}
                  content={message[1]}
                  sent={message[2]}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default ConversationsDisplay;
