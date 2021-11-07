import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/Modal.css';

const Modal = ({ close, children }) => {
  return ReactDOM.createPortal(
    <div className="modal" onClick={close}>
      {children}
    </div>,
    document.querySelector('body')
  );
};

export default Modal;
