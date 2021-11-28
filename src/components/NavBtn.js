import React from 'react';

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
