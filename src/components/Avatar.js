import React from 'react';

const Avatar = ({ img, channelName, onClick }) => {
  let filler = channelName ? (
    <span>{createInitials(channelName)}</span>
  ) : (
    <span></span>
  );

  const style = img ? { background: `url(${img})` } : { background: 'black' };
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
    .map((word) => word.charAt[0])
    .join();
}
