import React from 'react';

import '../styles/MsgButtons.css';

import replyIcon from '../assets/svg/reply-fill.svg';

const MsgButtons = ({}) => {
  return (
    <div className="msg-btns btn-ctn">
      <div className="container">
        <div className="wrapper">
          <button type="button">
            <img src={replyIcon} alt="reply" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MsgButtons;
