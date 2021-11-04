import React from 'react';

import Avatar from '../Avatar';

const UserDisplay = ({
  className,
  id,
  displayName,
  onClick,
  selectMention,
  mention,
  theme,
  searchValue,
  isFocused,
  ...parentProps
}) => {
  if (isFocused) className += ' user-focused';

  return (
    <li
      className={`user-wrapper ${className}`}
      onClick={onClick}
      {...parentProps}
    >
      <Avatar />
      <div className="content">
        <span>{displayName || mention.displayName}</span>

        <span className="subText"></span>
      </div>
    </li>
  );
};

export default UserDisplay;
