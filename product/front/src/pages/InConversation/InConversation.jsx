import React from "react";
import MessagesDisplay from "../../components/messagesDisplay/MessagesDisplay";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import "./InConversation.css";
import "../../components/participantsDisplay/ParticipantsDisplay.css"
import ParticipantsDisplay from "../../components/participantsDisplay/ParticipantsDisplay";
import InstantChat from "../../components/instantChat/InstantChat";
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

 
  // myFunction = () => {
  //   window.addEventListener("scroll", function(event) {
  //     let header = document.getElementById("myHeader");
  //     var sticky = header.offsetTop;
  //     console.log(header.offsetTop)
  //     if (window.pageYOffset > sticky) {
  //       console.log("add sticky")
  //       header.classList.add("sticky");
  //     } else {
  //       console.log("remove sticky")
  //       header.classList.remove("sticky");
  //     }
  //   }
  //   )}
   

  // Rendu React du composant
  render() {
    return (
      <>
        <div id="myHeader">
          <HeaderLogout />
          <DeleteMessage conversation={this.state.conv_id}/>
        </div>
        <div className='flex-aside'>
          <div className='side-bar-in-conv'>
            <span>Participants:</span>
            {this.state.participants.map((member) => {
              return (
                <ParticipantsDisplay name={member} user={this.state.username} />
              );
            })}
          </div>
          <div id='background'>
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
            <InstantChat
              id={this.props.match.params.id}
              username={this.state.username}
            />
          </div>
        </div>
      </>
    );
  }
}

export default InConversation;
