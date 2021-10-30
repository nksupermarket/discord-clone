import React, { useState } from 'react';

import ChatDisplay from './ChatDisplay';
import ChatBarWrapper from './ChatBarWrapper';

const ChatWrapper = ({ room, msgList, userList, submitMsg }) => {
  const [replyTo, setReplyTo] = useState();
  return (
    <main id="chat">
      <ChatDisplay msgList={msgList} setReplyTo={setReplyTo} />
      <ChatBarWrapper
        userList={userList}
        submit={submitMsg}
        roomName={room.name}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
      />
    </main>
  );
};

export default ChatWrapper;
