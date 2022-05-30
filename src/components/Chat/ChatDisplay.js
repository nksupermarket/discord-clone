import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import ChatMsg from './ChatMsg';

import '../../styles/ChatDisplay.css';

const ChatDisplay = ({ roomID, msgList, userList, ...props }) => {
  const messagesEndRef = useRef();
  const scrollerRef = useRef();
  const [isScrolled, setIsScrolled] = useState(true); // used to hide display when the auto scroll is in action; the auto scroll only affects display when you move from room to room so isScrolled can be initiated to true
  const [firstRender, setFirstRender] = useState(true);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'end',
      inline: 'center',
      alignToTop: false,
    });
  }

  useEffect(() => {
    setFirstRender(true);
    return () => {
      setIsScrolled(false);
    };
  }, [roomID]);

  useEffect(() => {
    scrollToBottom();
  }, [msgList]);

  return (
    <div className="messages-ctn">
      <div
        className="scroller"
        ref={scrollerRef}
        style={{ opacity: isScrolled ? 1 : 0 }}
        onLoad={async () => {
          await notifyWhenScrollingIsFinished(scrollerRef.current);
          setIsScrolled(true);
        }}
        onScroll={async () => {
          if (!firstRender) return;
          await notifyWhenScrollingIsFinished(scrollerRef.current);
          setIsScrolled(true);
          setFirstRender(false);
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

function notifyWhenScrollingIsFinished(el) {
  return new Promise((resolve) => {
    requestAnimationFrame(check);
    let sameFrame = 0;

    function check() {
      if (el.scrollHeight - el.offsetHeight - el.scrollTop < 50) {
        if (sameFrame++ > 10) return resolve();

        requestAnimationFrame(check);
      }
    }
  });
}

ChatDisplay.propTypes = {
  roomID: PropTypes.string,
  msgList: PropTypes.arrayOf(PropTypes.object),
  userList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};
