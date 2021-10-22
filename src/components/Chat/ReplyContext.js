import React from 'react';

import Avatar from '../Avatar';

const ReplyContext = ({ displayName, msg }) => {
  return (
    <div className="msg-reply-context">
      <Avatar />
      <span className="display-name">{displayName}</span>
      <div className="replied-text-preview">
        <div className="content">{msg}</div>
      </div>
    </div>
  );
};

export default ReplyContext;
