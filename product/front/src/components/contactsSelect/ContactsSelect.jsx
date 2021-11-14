import * as React from 'react';
import '../../components/contactsDisplay/ContactsDisplay.css'
import '../../components/contactsSelect/ContactsSelect.css'
import "../../components/participantsDisplay/ParticipantsDisplay.css"



export default class ContactsSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          contact: this.props.contacts,
        }
    }

    onTrigger = (event) => {
        let check = document.getElementById(`${this.state.contact.email}`)
        console.log("check: ", check)
        if (check.checked === true) {
          let username = document.getElementById(`${this.state.contact.username}`).textContent
          console.log("username: ", username)
          this.props.parentCallbackAdd(event.target.value, username);
          console.log("Add !")
  
        }

        else {
            let username = document.getElementById(`${this.state.contact.username}`).textContent
            this.props.parentCallbackRemove(event.target.value, username);
            console.log("Remove !")
        }
    }


    render() {



    return (
        <>
          <div className="members-select">
            <div id={this.state.contact.username} className="label">{this.state.contact.username}</div>
            <div className="check">
            <input type="checkbox" id={this.state.contact.email} value={this.state.contact.email} onChange={this.onTrigger}/>
            </div>
          </div>
        </>
        )
}
}