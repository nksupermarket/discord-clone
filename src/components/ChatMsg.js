import React from 'react';

import { convertTimestampToString } from '../logic/date';

import Avatar from './Avatar';

import '../styles/ChatMsg.css';

const ChatMsg = ({ content }) => {
  const { displayName, msg, timestamp } = content;
  return (
    <li className="chat-message">
      <Avatar />
      <div className="content">
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
