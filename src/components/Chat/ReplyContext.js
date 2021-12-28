import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';

const ReplyContext = ({ displayName, avatar, color, msg }) => {
  return (
    <div className="msg-reply-context">
      <Avatar img={avatar} color={color} />
      <span className="display-name">{displayName}</span>
      <div className="replied-text-preview">
        <div className="content">{msg}</div>
      </div>
    </div>
  );
};

export default ReplyContext;

ReplyContext.propTypes = {
  displayName: PropTypes.string,
  avatar: PropTypes.string,
  color: PropTypes.string,
  msg: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
