import React from 'react';

import Avatar from '../Avatar';

const UserDisplay = ({ displayName }) => {
  return (
    <li className="user-wrapper">
      <Avatar />
      <div className="content">
        <span>{displayName}</span>

        <span className="subText"></span>
      </div>
    </li>
  );
};

export default UserDisplay;
