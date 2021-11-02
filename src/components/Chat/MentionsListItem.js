import React from 'react';

import Avatar from '../Avatar';

const MentionsListItem = ({ displayName }) => {
  return (
    <>
      <Avatar />
      <div className="content">
        <span>{displayName}</span>

        <span className="subText"></span>
      </div>
    </>
  );
};

export default MentionsListItem;
