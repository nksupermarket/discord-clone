import React from 'react';

import ChatMsg from './ChatMsg';

import '../styles/ChatDisplay.css';

const ChatDisplay = ({ msgList }) => {
  console.log(msgList);
  return (
    <div className="messages-ctn">
      <div className="scroller">
        <div className="scroller-content">
          <ol>
            {msgList.map((content, i) => (
              <ChatMsg key={i} content={content} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ChatDisplay;
