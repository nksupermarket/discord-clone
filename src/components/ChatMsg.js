import React from 'react';

import { convertTimestampToString } from '../logic/date';

import '../styles/ChatMsg.css';

const ChatMsg = ({ content }) => {
  const { displayName, msg, timestamp } = content;
  return (
    <li className="chat-message">
      <div className="avatar" style={{ background: 'black' }}></div>
      <div className="content">
        {/* <img className="avatar" src="" alt={user} /> */}
        <header>
          <span className="user">{displayName}</span>
          <span className="timestamp">
            {convertTimestampToString(timestamp)}
          </span>
        </header>
        <div className="msg">{msg}</div>
      </div>
    </li>
  );
};

export default ChatMsg;
