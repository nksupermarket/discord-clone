import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/Error.css';

const Error = ({ errorMsg }) => {
  return ReactDOM.createPortal(
    <div id="error-popup">
      <p className="error-msg">
        <i className="ri-close-fill"></i> {errorMsg}
      </p>
    </div>,
    document.querySelector('body')
  );
};

export default Error;
