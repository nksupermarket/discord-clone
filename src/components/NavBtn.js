import React from 'react';
import PropTypes from 'prop-types';

const NavBtn = ({ icon, text, className, style, onClick }) => {
  return (
    <button
      type="button"
      className={className ? `${className} nav-btn` : 'nav-btn'}
      style={style}
      onClick={onClick}
    >
      <div className="icon-wrapper">
        <img src={icon} alt={text} />
      </div>
      <div className="text-wrapper">{text}</div>
    </button>
  );
};

export default NavBtn;

NavBtn.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
