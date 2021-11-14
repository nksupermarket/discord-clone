import React from 'react';

const FlatBtn = ({ className, type, text, isUnderline, onClick }) => {
  return (
    <button
      type={type || 'button'}
      className={`flat-btn ${className}`}
      onClick={onClick}
    >
      <span className={isUnderline ? 'underline-hover' : null}>{text}</span>
    </button>
  );
};

export default FlatBtn;
