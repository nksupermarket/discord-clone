import React from 'react';

import Avatar from '../Avatar';

const UserDisplay = ({ name, onClick }) => {
  console.log(name);
  return (
    <li className="user-wrapper" onClick={onClick}>
      <Avatar />
      <div className="content">
        <span>{name}</span>

        <span className="subText"></span>
      </div>
    </li>
  );
};

export default UserDisplay;
