import React from 'react';

import ReplyBar from './ReplyBar';

import '../../styles/ChatBar.css';
import ChatBar from './ChatBar';

const ChatBarWrapper = ({ replyTo, setReplyTo, ...props }) => {
  return (
    <form className="chat-bar" name="chat-bar" onSubmit={submitHandler}>
      {replyTo && (
        <ReplyBar
          displayName={replyTo.displayName}
          close={() => setReplyTo()}
        />
      )}
      <ChatBar setReplyTo={setReplyTo} replyTo={replyTo} {...props} />
    </form>
  );
};

export default ChatBarWrapper;

function submitHandler(e) {
  e.preventDefault();
}
