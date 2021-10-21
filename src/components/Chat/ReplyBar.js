import React from 'react';
import IconBtn from '../IconBtn';

import '../../styles/ReplyBar.css';

import closeBtn from '../../assets/svg/close-circle-fill.svg';

const ReplyBar = ({ displayName, close }) => {
  return (
    <div className="reply-bar">
      <div className="container">
        <div>
          <div className="content">
            Replying to <span className="display-name">{displayName}</span>
          </div>
        </div>
        <div className="actions btn-ctn">
          <IconBtn onClick={close} svg={closeBtn} className="close-btn" />
        </div>
      </div>
    </div>
  );
};

export default ReplyBar;
