import React from "react";
import MessagesDisplay from "../../components/messagesDisplay/MessagesDisplay";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import "./InConversation.css";
import ParticipantsDisplay from "../../components/participantsDisplay/ParticipantsDisplay";
import NavBar from "../../components/navBar/NavBar.js";
import DeleteMessage from "../../components/messagesRemove/DeleteMessage";


class InConversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], username: "", participants: [], conv_id: "", };
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
            conv_id: this.props.match.params.id,
          });
        }
      });
  };

  // Rendu React du composant
  render() {
    return (
      <>
        <NavBar />      
        <HeaderLogout />
        <DeleteMessage conversation={this.state.conv_id}/>
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
                  id={message[0]}
                  key={i}
                  author={message[1]}
                  content={message[2]}
                  sent={message[3]}
                />
              );
            })}
            {/* <instantChat /> */}
          </div>
        </div>
      </>
    );
  }
}

export default InConversation;
