import * as React from 'react';
import './MessagesDisplay.css'



export default function MessagesDisplay(props) {

    if (props.username === props.author) {
        if (props.content === 'message supprimé') {
            console.log("un message supprimé")
            return (
                <div className="contain-messages-user">
                    <div id={props.id} className="user-messages">
                        <div className="content-erased">🚫{props.content}</div>
                    </div>
                </div>
            )
            }
        else {
        return (
            <div className="contain-messages-user">
                <div className="author-user">Moi</div>
                <div className="aside">
                    <input className="checkbox" type="radio" name="radio" value={props.id}/>
                    <div id={props.id} className="user-messages">
                        <div className="content">{props.content}</div>
                        <div className="sent-date">{props.sent}</div>
                    </div>
                </div>
            </div>
        )
    }}
  
    else {
        if (props.content === 'message supprimé') {
            console.log("un message supprimé")
            return (
                <div className="contain-messages">
                    <div id={props.id} className="messages">
                        <div className="content-erased">🚫{props.content}</div>
                    </div>
                </div>
            )
            }
        else {
            return (
                <div className="contain-messages">
                    <div className="author">{props.author}</div>
                    <div id={props.id} className="messages">
                        <div className="content">{props.content}</div>
                        <div className="sent-date">{props.sent}</div>
                    </div>
                </div>
            )
        }
        
    } 
}