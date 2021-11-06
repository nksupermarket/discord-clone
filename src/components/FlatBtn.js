import React from 'react';

const FlatBtn = ({ type, text, onClick }) => {
  return (
    <button type={type || 'button'} className="flat-btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default FlatBtn;
