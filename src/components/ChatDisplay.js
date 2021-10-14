import React, { useEffect } from 'react';

import ChatMsg from './ChatMsg';

import '../styles/ChatDisplay.css';

const ChatDisplay = ({ msgList }) => {
  useEffect(() => {
    if (msgList.length > 0) {
      msgList.length = 30;
      msgList.fill(msgList[0], 1, 30);
    }
  });

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
