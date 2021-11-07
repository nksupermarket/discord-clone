import React from 'react';

const FlatBtn = ({ className, type, text, onClick }) => {
  return (
    <button
      type={type || 'button'}
      className={`flat-btn ${className}`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};

export default FlatBtn;
