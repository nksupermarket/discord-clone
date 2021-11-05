import React from 'react';

import ChatMsg from './ChatMsg';

import '../../styles/ChatDisplay.css';

const ChatDisplay = ({ msgList, ...props }) => {
  return (
    <div className="messages-ctn">
      <div className="scroller">
        <div className="scroller-content">
          <ol>
            {msgList.map((content) => (
              <ChatMsg key={content.msgId} content={content} {...props} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ChatDisplay;
