import React from 'react';
import PropTypes from 'prop-types';

import '../styles/IconBtn.css';

const IconBtn = ({ icon, svg, alt, className, elRef, ...props }) => {
  const iconClassName = icon;

  className = className ? `icon-btn ${className}` : 'icon-btn';
  return (
    <button
      ref={elRef}
      type="button"
      className={className}
      {...props}
    >
      {icon && <i className={iconClassName}></i>}
      {svg && <img src={svg} alt={alt} />}
    </button>
  );
};

export default IconBtn;

IconBtn.propTypes = {
  icon: PropTypes.string,
  svg: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  elRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
