import * as React from "react";
import "./ParticipantsDisplay.css";

export default function ParticipantsDisplay(props) {
  if (props.name === props.username) {
    return <div className='members'>Vous <span className="your-name">({props.name})</span></div>;
  } else {
    return <div className='members'>{props.name}</div>;
  }
}
