import React from 'react';

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
