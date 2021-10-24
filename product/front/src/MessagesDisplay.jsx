import * as React from 'react';
import './MessagesDisplay.css'


export default function MessagesDisplay(props) {

    if (props.username === props.author) {
        return (
            <div className="user-messages">
                <div className="content">{props.content}</div>
                <div className="author">{props.author}</div>
                <div className="sent-date">{props.sent}</div>
            </div>
        )
    }
    else {
        return (
            <div className="messages">
                <div className="content">{props.content}</div>
                <div className="author">{props.author}</div>
                <div className="sent-date">{props.sent}</div>
            </div>
        )
    } 
}