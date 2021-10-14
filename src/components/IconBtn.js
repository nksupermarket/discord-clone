import React from 'react';

import '../styles/IconBtn.css';

const IconBtn = ({
  onClick,
  icon,
  svg,
  alt,
  className,
  isCircle,
  isRectangle,
}) => {
  let iconClassName = icon;

  if (isCircle) iconClassName += ' circle';
  if (isRectangle) iconClassName += ' rectangle';

  className = className ? `icon-btn ${className}` : 'icon-btn';
  return (
    <button type="button" className={className} onClick={onClick}>
      {icon && <i className={iconClassName}></i>}
      {svg && <img src={svg} alt={alt} />}
    </button>
  );
};

export default IconBtn;
