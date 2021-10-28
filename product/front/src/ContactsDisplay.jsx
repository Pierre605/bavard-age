import * as React from 'react';
import './ContactsDisplay.css'



export default function ContactsDisplay(props) {

    return (
            <div className="members">{props.username}{props.email}</div>
        )
}