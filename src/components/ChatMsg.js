import React from 'react';

import { convertTimestampToString } from '../logic/date';

import Avatar from './Avatar';

import '../styles/ChatMsg.css';

const ChatMsg = ({ content }) => {
  const { displayName, msg, timestamp } = content;
  return (
    <li className="chat-msg">
      <div className="msg">
        <div className="msg-reply-context"></div>
        <div className="content">
          <Avatar />
          <header>
            <span className="user">{displayName}</span>
            <span className="timestamp">
              {convertTimestampToString(timestamp)}
            </span>
          </header>
          <div className="msg-content">{msg}</div>
        </div>
      </div>
    </li>
  );
};

export default ChatMsg;
