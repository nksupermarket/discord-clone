import React from 'react';
import PropTypes from 'prop-types';

import '../styles/FlatBtn.css';

const FlatBtn = ({ className, type, text, isUnderline, onClick }) => {
  return (
    <button
      type={type || 'button'}
      className={className ? `flat-btn ${className}` : 'flat-btn'}
      onClick={onClick}
    >
      <span className={isUnderline ? 'underline-hover' : null}>
        {text}
      </span>
    </button>
  );
};

export default FlatBtn;

FlatBtn.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  isUnderline: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
