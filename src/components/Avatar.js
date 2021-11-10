import React from 'react';

const Avatar = ({ img, channelName, onClick }) => {
  let filler = channelName ? (
    <span>{createInitials(channelName)}</span>
  ) : (
    <span></span>
  );

  const style = img
    ? { background: `url(${img})`, backgroundSize: 'cover' }
    : { background: 'var(--bg-color' };
  return (
    <div className="avatar" style={style} onClick={onClick}>
      {!img && filler}
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
