import React, { useState } from 'react';

import IconBtn from '../IconBtn';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';

const ChatBarWrapper = ({ style, roomName, replyTo, setReplyTo, submit }) => {
  const [msg, setMsg] = useState();

  return (
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
              const replyingTo = replyTo ? replyTo.msgId : null;
              setReplyTo();
              submit(msg, replyingTo);
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
  );
};

export default ChatBarWrapper;
