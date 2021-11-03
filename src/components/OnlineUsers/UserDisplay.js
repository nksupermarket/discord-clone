import React from 'react';

import Avatar from '../Avatar';

const UserDisplay = ({ displayName, onClick, mention }) => {
  displayName = displayName || mention.displayName;
  return (
    <li className="user-wrapper" onClick={onClick}>
      <Avatar />
      <div className="content">
        <span>{displayName}</span>

        <span className="subText"></span>
      </div>
    </li>
  );
};

export default UserDisplay;
