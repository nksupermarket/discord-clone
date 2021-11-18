import React from 'react';

import LoadingEllipsis from './LoadingEllipsis';

const FlatBtn = ({ className, type, text, isUnderline, loading, onClick }) => {
  return (
    <button
      type={type || 'button'}
      className={`flat-btn ${className}`}
      onClick={onClick}
    >
      {loading ? (
        <LoadingEllipsis />
      ) : (
        <span className={isUnderline ? 'underline-hover' : null}>{text}</span>
      )}
    </button>
  );
};

export default FlatBtn;
