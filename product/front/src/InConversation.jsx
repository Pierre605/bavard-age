import React from 'react'
import Logout from './Logout';
import MessagesDisplay from './MessagesDisplay';
import UserContext from './UserContext';


class InConversation extends React.Component {
    constructor(props) {
      super(props);
      this.state = ({ messages: [],
                     username: '',
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
                           username: messages[1]})
          }
        })
        }
  
    // Rendu React du composant  
    render() {
      return (
        <>
          <a href="/conversation-list">
            <img src="/logo2.png" width="100px" alt="logo-provisoire"/>
          </a>
          {this.state.messages.map((message, i) => {
              return (
                      <MessagesDisplay username={this.state.username} id={i} author={message[0]} content={message[1]} sent={message[2]}/>
              )
          })}
          <Logout />
        </>
      );
    }
  }

export default InConversation