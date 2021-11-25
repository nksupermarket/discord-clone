import React, { useEffect, useRef } from 'react';

import ChatMsg from './ChatMsg';

import '../../styles/ChatDisplay.css';

const ChatDisplay = ({ msgList, ...props }) => {
  const messagesEndRef = useRef();

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, [msgList]);
  return (
    <div className="messages-ctn">
      <div className="scroller">
        <div className="scroller-content">
          <ol>
            {msgList.map((content, i) => (
              <ChatMsg key={content.msgId} content={content} {...props} />
            ))}
          </ol>
        </div>
        <span ref={messagesEndRef}></span>
      </div>
    </div>
  );
};

export default ChatDisplay;
