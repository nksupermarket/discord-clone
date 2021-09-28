import React from 'react';

import ChatMsg from './ChatMsg';

const ChatDisplay = ({ msgList }) => {
  return (
    <div className="messages-ctn">
      <ol>
        {msgList.map((content, i) => (
          <ChatMsg key={i} content={content} />
        ))}
      </ol>
    </div>
  );
};

export default ChatDisplay;
