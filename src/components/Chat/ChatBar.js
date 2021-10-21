import React, { useState } from 'react';

import IconBtn from '../IconBtn';
import ReplyBar from './ReplyBar';

import '../../styles/ChatBar.css';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';

const ChatBar = ({ submit, roomName, replyTo, setReplyTo }) => {
  const [msg, setMsg] = useState();

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
      <div className="chat-wrapper" style={style}>
        <div className="add-wrapper">
          <IconBtn svg={addCircleSvg} alt="upload a file" />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="chat"
            placeholder={`message #${roomName}`}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setReplyTo();
                submit(msg, replyTo.msgId);
                e.target.value = '';
              }
            }}
          />
        </div>
        <div className="btn-ctn">
          <IconBtn icon="flaticon-gif" isRectangle={true} />
          <IconBtn icon="flaticon-happy" />
        </div>
      </div>
    </form>
  );
};

export default ChatBar;

function submitHandler(e) {
  e.preventDefault();
}
