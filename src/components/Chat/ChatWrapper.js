import React, { useState } from 'react';

import ChatDisplay from './ChatDisplay';
import ChatBarWrapper from './ChatBarWrapper';

const ChatWrapper = ({ room, msgList, submitMsg, mentions, setMentions }) => {
  const [replyTo, setReplyTo] = useState();
  return (
    <main id="chat">
      <ChatDisplay msgList={msgList} setReplyTo={setReplyTo} />
      <ChatBarWrapper
        submit={submitMsg}
        roomName={room.name}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        mentions={mentions}
        setMentions={setMentions}
      />
    </main>
  );
};

export default ChatWrapper;
