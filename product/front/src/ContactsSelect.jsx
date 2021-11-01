import * as React from 'react';
import './ContactsDisplay.css'
import './ContactsSelect.css'



export default class ContactsSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          contact: this.props.contacts,
        }
    }

    onTrigger = (event) => {
        let check = document.getElementById(`${this.state.contact.email}`)
        console.log(check)
        if (check.checked == true) {
        this.props.parentCallbackAdd(event.target.value);
        console.log("Add !")
        }

        else {
            this.props.parentCallbackRemove(event.target.value);
            console.log("Remove !")
        }
    }


    render() {



    return (
        <>
          <div className="members-select">
            <div className="label">{this.state.contact.username}</div>
            <div className="check">
            <input type="checkbox" id={this.state.contact.email} value={this.state.contact.email} onChange={this.onTrigger}/>
            </div>
          </div>
        </>
        )
}
}