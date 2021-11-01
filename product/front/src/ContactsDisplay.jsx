import * as React from 'react';
import './ContactsDisplay.css'



export default function ContactsDisplay(props) {

    return (
        <>
          <div className="members">
            <div className="username">{props.username}</div>
            <div className="email">{props.email}</div>
          </div>
        </>
        )
}