import React from 'react';

import '../../styles/MsgButtons.css';

import replyIcon from '../../assets/svg/reply-fill.svg';
import IconBtn from '../IconBtn';

const MsgButtons = ({ setReplyTo, setIsShowBtns }) => {
  return (
    <div
      className="msg-btns btn-ctn"
      onMouseOver={() => setIsShowBtns(true)}
      onMouseOut={() => setIsShowBtns(false)}
    >
      <div className="container">
        <div className="wrapper">
          <IconBtn src={replyIcon} alt="reply button" onClick={setReplyTo} />
        </div>
      </div>
    </div>
  );
};

export default MsgButtons;
