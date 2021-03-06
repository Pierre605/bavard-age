import React from "react";
import MessagesDisplay from "../../components/messagesDisplay/MessagesDisplay";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import "./InConversation.css";
import "../../components/participantsDisplay/ParticipantsDisplay.css";
import ParticipantsDisplay from "../../components/participantsDisplay/ParticipantsDisplay";
import InstantChat from "../../components/instantChat/InstantChat";
import DeleteMessage from "../../components/messagesRemove/DeleteMessage";
import '../createConversation/CreateConversation.css'


class InConversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], username: [], user_id: [], participants: [], conv_id: [], };
    // this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount() {
    this.setLogoWithText();
    this.getConversation();
    this.refresh = setInterval(() => {
      this.getConversation();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.refresh);
  }

  getConversation = () => {
    fetch("http://localhost:5000/" + this.props.match.params.user_id + "/conversation/" + this.props.match.params.id)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const messages = JSON.parse(data);
         if (messages.includes("user not in this")) {
          alert("You are not part of this conversation");
        } else {
          this.setState({
            messages: messages[0],
            username: messages[1],
            participants: messages[2],
            user_id: messages[3],
            conv_id: this.props.match.params.id,
          });
        }
      });
  };

  setLogoWithText = () => {
    let logo = document.getElementById('home')
    logo.firstChild.src = '/retourner_a_laccueil.png';
    logo.firstChild.style = 'width: 150px';
  }
   

  // Rendu React du composant
  render() {
    return (
      <>
        <div id="myHeader">
          <HeaderLogout user={this.state.user_id} />
          <DeleteMessage 
          conversation={this.state.conv_id} 
          refresh={this.getConversation} 
          user={this.state.user_id}/>
        </div>
        <div className='flex-aside'>
          <div class="column-fix">
            <div className="tab-head-3">PARTICIPANTS</div>
            <div className='side-bar-in-conv'>
            {this.state.participants.map((member) => {
              return (
                <ParticipantsDisplay name={member} username={this.state.username} />
              );
            })}
            </div>
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
              user={this.state.user_id}
              refresh={this.getConversation}
            />
          </div>
        </div>
      </>
    );
  }
}

export default InConversation;
