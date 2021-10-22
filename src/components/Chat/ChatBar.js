import React from 'react';

import ReplyBar from './ReplyBar';

import '../../styles/ChatBar.css';
import ChatBarWrapper from './ChatBarWrapper';

const ChatBar = ({ submit, roomName, replyTo, setReplyTo }) => {
  let style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  return (
    <form className="chat-bar" name="chat-bar" onSubmit={submitHandler}>
      {replyTo && (
        <ReplyBar
          displayName={replyTo.displayName}
          close={() => setReplyTo()}
        />
      )}
      <ChatBarWrapper
        style={style}
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
