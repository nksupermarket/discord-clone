import React from 'react';

import Avatar from '../Avatar';

const UserDisplay = ({
  className,
  id,
  displayName,
  avatar,
  color,
  onClick,
  selectMention, // need this here so it doesn't get fed into parentProps
  mention,
  theme, // need this here so it doesn't get fed into parentProps
  searchValue, // need this here so it doesn't get fed into parentProps
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
      <Avatar img={avatar} color={color} />
      <div className="content">
        <span>{displayName || mention.displayName}</span>

        <span className="subText"></span>
      </div>
    </li>
  );
};

export default UserDisplay;
