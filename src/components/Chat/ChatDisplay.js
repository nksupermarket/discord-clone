import React, { useEffect } from 'react';

import ChatMsg from './ChatMsg';

import '../../styles/ChatDisplay.css';

const ChatDisplay = ({ msgList, setReplyTo }) => {
  return (
    <div className="messages-ctn">
      <div className="scroller">
        <div className="scroller-content">
          <ol>
            {msgList.map((content, i) => (
              <ChatMsg key={i} content={content} setReplyTo={setReplyTo} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ChatDisplay;
