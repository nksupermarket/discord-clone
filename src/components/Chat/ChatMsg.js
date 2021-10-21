import React, { useState } from 'react';

import { convertTimestampToString } from '../../logic/date';

import Avatar from '../Avatar';
import MsgButtons from './MsgButtons';

import '../../styles/ChatMsg.css';

const ChatMsg = ({ content, setReplyTo }) => {
  const { displayName, msg, timestamp, msgId, replyTo: replyContext } = content;

  const [isShowBtns, setIsShowBtns] = useState(false);

  console.log(isShowBtns, setIsShowBtns);
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
          <div className="msg-reply-context">
            <Avatar />
            <span className="display-name">{replyContext.displayName}</span>
            <div className="replied-text-preview">
              <div className="content">{replyContext.msg}</div>
            </div>
          </div>
        )}
        <div className="content">
          <Avatar />
          <header>
            <span className="display-name">{displayName}</span>
            <span className="timestamp">
              {convertTimestampToString(timestamp)}
            </span>
          </header>
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
