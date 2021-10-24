import * as React from 'react';
import './ConversationsByRows.css'

export default function ConversationsByRows(props) {
  return (
    <a href={`/conversation/${props.id}`}>
      <div className="conversations-rows">{props.name}</div>
    </a>
  );
}