import React, { useEffect, useRef } from 'react';

import ChatMsg from './ChatMsg';

import '../../styles/ChatDisplay.css';

const ChatDisplay = ({ msgList, userList, ...props }) => {
  const messagesEndRef = useRef();

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
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
            {msgList.map((obj) => {
              return (
                <ChatMsg
                  key={obj.msgId}
                  content={obj}
                  userList={userList}
                  {...props}
                />
              );
            })}
          </ol>
        </div>
        <span ref={messagesEndRef}></span>
      </div>
    </div>
  );
};

export default ChatDisplay;
