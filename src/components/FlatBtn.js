import React from 'react';

import LoadingEllipsis from './LoadingEllipsis';

import '../styles/FlatBtn.css';

const FlatBtn = ({ className, type, text, isUnderline, loading, onClick }) => {
  return (
    <button
      type={type || 'button'}
      className={className ? `flat-btn ${className}` : 'flat-btn'}
      onClick={onClick}
    >
      {loading ? (
        <LoadingEllipsis size={'small'} />
      ) : (
        <span className={isUnderline ? 'underline-hover' : null}>{text}</span>
      )}
    </button>
  );
};

export default FlatBtn;
