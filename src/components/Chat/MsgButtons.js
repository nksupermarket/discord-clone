import React from 'react';

import '../../styles/MsgButtons.css';

import replyIcon from '../../assets/svg/reply-fill.svg';

const MsgButtons = ({ setReplyTo, setIsShowBtns }) => {
  return (
    <div
      className="msg-btns btn-ctn"
      onMouseOver={() => setIsShowBtns(true)}
      onMouseOut={() => setIsShowBtns(false)}
    >
      <div className="container">
        <div className="wrapper">
          <button type="button" onClick={setReplyTo}>
            <img src={replyIcon} alt="reply" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MsgButtons;
