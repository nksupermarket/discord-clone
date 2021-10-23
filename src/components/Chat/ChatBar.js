import React from 'react';

import ReplyBar from './ReplyBar';

import '../../styles/ChatBar.css';
import ChatBarWrapper from './ChatBarWrapper';

const ChatBar = ({ submit, roomName, replyTo, setReplyTo }) => {
  return (
    <form className="chat-bar" name="chat-bar" onSubmit={submitHandler}>
      {replyTo && (
        <ReplyBar
          displayName={replyTo.displayName}
          close={() => setReplyTo()}
        />
      )}
      <ChatBarWrapper
        submit={submit}
        roomName={roomName}
        setReplyTo={setReplyTo}
        replyTo={replyTo}
      />
    </form>
  );
};

export default ChatBar;

function submitHandler(e) {
  e.preventDefault();
}
