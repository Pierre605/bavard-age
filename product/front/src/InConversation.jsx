import React from 'react'
import Logout from './Logout';
import MessagesDisplay from './MessagesDisplay';
import UserContext from './UserContext';
import Header from './Header'
import './InConversation.css'
import ParticipantsDisplay from './ParticipantsDisplay';


class InConversation extends React.Component {
    constructor(props) {
      super(props);
      this.state = ({ messages: [],
                     username: '',
                     participants: [],
                    }
      );
      this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount() {
      this.getConversation();
    }

    handleRegister(ev) {
    }

    getConversation = () => {
        fetch('http://localhost:5000/conversation/' + this.props.match.params.id)
        .then(response => {
          return response.text()
        })
        .then(data => {
          const messages = JSON.parse(data)
          console.log(messages)
          if (messages.includes("user not in this")) {
              alert("You are not part of this conversation")
          }
          else {
            this.setState({messages: messages[0],
                           username: messages[1],
                           participants: messages[2]})
          }
        })
        }
  
    // Rendu React du composant  
    render() {
      return (
        <>
           <Header />
            <div id="flex-aside">
              <div className="side-bar">
              {this.state.participants.map((member) => {
                return (
                  <ParticipantsDisplay name={member} user={this.state.username} />
                )
              })}
              </div>
                <div className="background">
                {this.state.messages.map((message, i) => {
                    return (
                            <MessagesDisplay username={this.state.username} id={i} author={message[0]} content={message[1]} sent={message[2]}/>
                    )
                })}
                </div>
            </div>
        </>
      );
    }
  }

export default InConversation