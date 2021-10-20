// import './Home.css';
import reactDom from 'react-dom';
import * as React from 'react';
import Logout from './Logout';



class UserConnectedHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    }
  }

  componentDidMount() {
    this.getConversations()
  }

  getConversations = () => {
    fetch('http://localhost:5000/conversation-list')
    .then(response => {
      return(
        response.text()
    )})
    .then(data => {
      let convers_list = data
      console.log(convers_list)
      this.setState({conversations: convers_list})
    })
  }



render() {

return (
    <>
    <section>
      <div>Conversations:</div>
      <div>{this.state.conversations}</div>
    </section>
    </>
  );
}
}

export default UserConnectedHome;
