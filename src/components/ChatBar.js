import React, { useState } from 'react';

import IconBtn from './IconBtn';

const ChatBar = ({ submit }) => {
  const [msg, setMsg] = useState();

  return (
    <form className="chat-bar" name="chat-bar" onSubmit={submitHandler}>
      <div className="add-wrapper">
        <IconBtn icon="add" />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="chat"
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
        <IconBtn icon="gif" />
        <IconBtn icon="emoji" />
      </div>
    </form>
  );
};

export default ChatBar;

function submitHandler(e) {
  e.preventDefault();
}
