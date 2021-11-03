import React from 'react';

import Avatar from '../Avatar';

const UserDisplay = ({
  className,
  id,
  displayName,
  onClick,
  mention,
  theme,
  searchValue,
  isFocused,
  ...parentProps
}) => {
  displayName = displayName || mention.displayName;

  return (
    <li className="user-wrapper" onClick={onClick} {...parentProps}>
      <Avatar />
      <div className="content">
        <span>{displayName}</span>

        <span className="subText"></span>
      </div>
    </li>
  );
};

export default UserDisplay;
