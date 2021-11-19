import React from 'react';

import Avatar from '../Avatar';

const UserDisplay = ({
  className,
  id,
  user,
  onClick,
  selectMention, // need this here so it doesn't get fed into parentProps
  mention,
  theme, // need this here so it doesn't get fed into parentProps
  searchValue, // need this here so it doesn't get fed into parentProps
  isFocused,
  ...parentProps
}) => {
  if (isFocused) className += ' user-focused';

  user = user || mention;
  const { avatar, color, status, displayName } = user;

  return (
    <li
      className={`user-wrapper ${className}`}
      onClick={onClick}
      {...parentProps}
    >
      <Avatar img={avatar} color={color} userStatus={status} />
      <div className="content">
        <span>{displayName}</span>

        <span className="subText"></span>
      </div>
    </li>
  );
};

export default UserDisplay;
