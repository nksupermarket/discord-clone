import React from 'react';

import '../styles/LoadingEllipsis.css';

const LoadingEllipsis = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingEllipsis;
