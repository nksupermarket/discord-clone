import React from 'react';
import PropTypes from 'prop-types';

import '../styles/LoadingEllipsis.css';

const LoadingEllipsis = ({ size }) => {
  return (
    <div className={size ? `lds-ellipsis ${size}` : 'lds-ellipsis'}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingEllipsis;

LoadingEllipsis.propTypes = {
  size: PropTypes.string,
};
