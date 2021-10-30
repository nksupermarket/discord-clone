import React from 'react';

import ReplyBar from './ReplyBar';

import '../../styles/ChatBar.css';
import ChatBar from './ChatBar';

const ChatBarWrapper = ({
  submit,
  roomName,
  userList,
  replyTo,
  setReplyTo,
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
        userList={userList}
        roomName={roomName}
        setReplyTo={setReplyTo}
        replyTo={replyTo}
      />
    </form>
  );
};

export default ChatBarWrapper;

function submitHandler(e) {
  e.preventDefault();
}
