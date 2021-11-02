import * as React from "react";
import "./ContactsDisplay.css";

export default function ContactsDisplay(props) {
  return (
    <ul className='members'>
      {props.id}
      <li style={{ listStyle: "none" }}>
        {props.username} : {props.email}
      </li>
    </ul>
  );
}
