import React, { useState, useEffect, useRef } from 'react';

import ChatDisplay from './ChatDisplay';
import ChatBarWrapper from './ChatBarWrapper';

const ChatWrapper = ({ room, msgList, userList, submitMsg }) => {
  const [replyTo, setReplyTo] = useState();

  const chatBarInputRef = useRef();

  function onReplyTo(displayName, msgID) {
    setReplyTo(displayName, msgID);
    chatBarInputRef.current.focus();
  }

  return (
    <main id="chat">
      <ChatDisplay
        msgList={msgList}
        setReplyTo={setReplyTo}
        onReplyTo={onReplyTo}
      />
      <ChatBarWrapper
        userList={userList}
        submit={submitMsg}
        roomName={room.name}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        chatBarInputRef={chatBarInputRef}
      />
    </main>
  );
};

export default ChatWrapper;
