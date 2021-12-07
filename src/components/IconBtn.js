import React from 'react';

import '../styles/IconBtn.css';

const IconBtn = ({ icon, svg, alt, className, elRef, ...props }) => {
  let iconClassName = icon;

  className = className ? `icon-btn ${className}` : 'icon-btn';
  return (
    <button ref={elRef} type="button" className={className} {...props}>
      {icon && <i className={iconClassName}></i>}
      {svg && <img src={svg} alt={alt} />}
    </button>
  );
};

export default IconBtn;
