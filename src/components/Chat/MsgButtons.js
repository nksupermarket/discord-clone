import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/MsgButtons.css';

import replyIcon from '../../assets/svg/reply-fill.svg';
import IconBtn from '../IconBtn';

const MsgButtons = ({ setReplyTo }) => {
  return (
    <div className="msg-btns btn-ctn">
      <div className="container">
        <div className="wrapper">
          <IconBtn
            svg={replyIcon}
            alt="reply button"
            onClick={setReplyTo}
          />
        </div>
      </div>
    </div>
  );
};

export default MsgButtons;

MsgButtons.propTypes = {
  setReplyTo: PropTypes.func,
};
