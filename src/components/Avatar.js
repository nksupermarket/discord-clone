import React, { useMemo } from 'react';

import defaultBreadPNG from '../assets/png/icons8-bread-58.png';

import '../styles/Avatar.css';

const Avatar = ({ img, color, userStatus, channelName, onClick }) => {
  let filler = channelName ? (
    <span>{createInitials(channelName)}</span>
  ) : (
    <span></span>
  );
  const style = img
    ? { background: `url(${img})`, backgroundSize: 'cover' }
    : color
    ? {
        background: color,
      }
    : { background: 'var(--bg-color' };

  return (
    <div className="avatar" style={style} onClick={onClick}>
      {!img && channelName && filler}
      {!img && color && <img src={defaultBreadPNG} alt="default avatar" />}
      {userStatus && <div className={`user-status ${userStatus}`}></div>}
    </div>
  );
};

export default Avatar;

function createInitials(channelName) {
  return channelName
    .split(' ')
    .map((word) => word.charAt(0))
    .filter((char, i) => i < 3)
    .join('');
}
