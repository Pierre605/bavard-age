import * as React from 'react';
import './ParticipantsDisplay.css'



export default function ParticipantsDisplay(props) {

    if (props.name == props.user) {
        return (
            <div className="members">Vous</div>
        )
    }

    else {
        return (
            <div className="members">{props.name}</div>
        )
    }
}