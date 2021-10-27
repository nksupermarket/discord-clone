import React from 'react';

import ReplyBar from './ReplyBar';

import '../../styles/ChatBar.css';
import ChatBar from './ChatBar';

const ChatBarWrapper = ({
  submit,
  roomName,
  replyTo,
  setReplyTo,
  mentions,
  setMentions,
}) => {
  return (
    <form className="chat-bar" name="chat-bar" onSubmit={submitHandler}>
      {replyTo && (
        <ReplyBar
          displayName={replyTo.displayName}
          close={() => setReplyTo()}
        />
      )}
      <ChatBar
        submit={submit}
        roomName={roomName}
        setReplyTo={setReplyTo}
        replyTo={replyTo}
        mentions={mentions}
        setMentions={setMentions}
      />
    </form>
  );
};

export default ChatBarWrapper;

function submitHandler(e) {
  e.preventDefault();
}
