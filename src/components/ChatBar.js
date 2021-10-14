import React, { useState } from 'react';

import IconBtn from './IconBtn';

import '../styles/ChatBar.css';

import addCircleSvg from '../assets/svg/add-circle-fill.svg';

const ChatBar = ({ submit, roomName }) => {
  const [msg, setMsg] = useState();

  return (
    <form className="chat-bar" name="chat-bar" onSubmit={submitHandler}>
      <div className="chat-wrapper">
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
                submit(msg);
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
