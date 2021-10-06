import React from 'react';

import '../styles/Error.css';

const Error = ({ errorMsg }) => {
  return (
    <div id="error-popup">
      <p className="error-msg">
        <i className="ri-close-fill"></i> {errorMsg}
      </p>
    </div>
  );
};

export default Error;
