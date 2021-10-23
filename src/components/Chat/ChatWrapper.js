import React, { useState } from 'react';

import ChatDisplay from './ChatDisplay';
import ChatBarWrapper from './ChatBarWrapper';

const ChatWrapper = ({ room, msgList, submitMsg, mention, setMention }) => {
  const [replyTo, setReplyTo] = useState();
  return (
    <main id="chat">
      <ChatDisplay msgList={msgList} setReplyTo={setReplyTo} />
      <ChatBarWrapper
        submit={submitMsg}
        roomName={room.name}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        mention={mention}
        setMention={setMention}
      />
    </main>
  );
};

export default ChatWrapper;
