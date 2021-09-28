import React from 'react';

import '../styles/ChatMsg.css';

const ChatMsg = ({ content }) => {
  const { user, msg, timestamp } = content;
  return (
    <li className="chat-message">
      <div className="avatar" style={{ background: 'black' }}></div>
      <div className="content">
        {/* <img className="avatar" src="" alt={user} /> */}
        <header>
          <span className="user">{user}</span>
          <span className="timestamp">{timestamp}</span>
        </header>
        <div className="msg">{msg}</div>
      </div>
    </li>
  );
};

export default ChatMsg;
