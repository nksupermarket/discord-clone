import React from 'react';
import IconBtn from './IconBtn';

import '../styles/ReplyBar.css';

import closeBtn from '../assets/svg/close-circle-fill.svg';

const ReplyBar = ({ displayName }) => {
  return (
    <div className="reply-bar">
      <div className="container">
        <div className="content">
          Replying to <span>{displayName}</span>
        </div>
        <div className="actions btn-ctn">
          <IconBtn svg={closeBtn} />
        </div>
      </div>
    </div>
  );
};

export default ReplyBar;
