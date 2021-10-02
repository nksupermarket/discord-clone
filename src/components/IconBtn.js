import React from 'react';

import '../styles/IconBtn.css';

const IconBtn = ({ onClick, icon, isCircle, isRectangle }) => {
  let iconClassName = icon;

  if (isCircle) iconClassName += ' circle';
  if (isRectangle) iconClassName += ' rectangle';
  return (
    <button type="button" className="icon-btn" onClick={onClick}>
      <i className={iconClassName}></i>
    </button>
  );
};

export default IconBtn;
