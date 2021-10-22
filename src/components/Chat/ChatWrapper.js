import React, { useState } from 'react';

import ChatDisplay from './ChatDisplay';
import ChatBar from './ChatBar';

const ChatWrapper = ({ room, msgList, submitMsg }) => {
  const [replyTo, setReplyTo] = useState();

  return (
    <main id="chat">
      <ChatDisplay msgList={msgList} setReplyTo={setReplyTo} />
      <ChatBar
        submit={submitMsg}
        roomName={room.name}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
      />
    </main>
  );
};

export default ChatWrapper;
