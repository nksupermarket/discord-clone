import React from 'react';

import '../styles/Modal.css';

const Modal = ({ close, children }) => {
  return (
    <div className="modal" onClick={close}>
      {children}
    </div>
  );
};

export default Modal;
