import React, { useState, useEffect, useRef } from 'react';

import ChatMsg from './ChatMsg';

import '../../styles/ChatDisplay.css';

const ChatDisplay = ({ msgList, userList, ...props }) => {
  const messagesEndRef = useRef();
  const scrollerRef = useRef();

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
      <div
        className="scroller"
        ref={scrollerRef}
        style={{
          opacity:
            scrollerRef.current?.scrollTop ===
            scrollerRef.current?.scrollHeight -
              scrollerRef.current?.offsetHeight
              ? 0
              : 1,
        }}
      >
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
