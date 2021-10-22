import React, { useState } from 'react';

import Avatar from '../Avatar';
import MsgButtons from './MsgButtons';

import '../../styles/ChatMsg.css';
import ReplyContext from './ReplyContext';
import MsgHeader from './MsgHeader';

const ChatMsg = ({ content, setReplyTo }) => {
  const { displayName, msg, timestamp, msgId, replyTo: replyContext } = content;

  const [isShowBtns, setIsShowBtns] = useState(false);

  function replyToThisMsg() {
    setReplyTo({
      displayName,
      msgId,
    });
  }
  return (
    <li
      className="chat-msg"
      onMouseOver={() => setIsShowBtns(true)}
      onMouseOut={() => setIsShowBtns(false)}
    >
      <div className="msg">
        {replyContext && (
          <ReplyContext
            displayName={replyContext.displayName}
            msg={replyContext.msg}
          />
        )}
        <div className="content">
          <Avatar />
          <MsgHeader displayName={displayName} timestamp={timestamp} />
          <div className="msg-content">{msg}</div>
          {isShowBtns && (
            <MsgButtons
              msgId={msgId}
              setReplyTo={replyToThisMsg}
              setIsShowBtns={setIsShowBtns}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default ChatMsg;
