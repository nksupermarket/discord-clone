import React from 'react';

import '../styles/IconBtn.css';

const IconBtn = ({ onClick, icon, className, isCircle, isRectangle }) => {
  let iconClassName = icon;

  if (isCircle) iconClassName += ' circle';
  if (isRectangle) iconClassName += ' rectangle';

  className = className ? `icon-btn ${className}` : 'icon-btn';
  return (
    <button type="button" className={className} onClick={onClick}>
      <i className={iconClassName}></i>
    </button>
  );
};

export default IconBtn;
