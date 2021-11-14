import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ close, children }) => {
  return ReactDOM.createPortal(
    <div className="modal" onClick={close}>
      {children}
    </div>,
    document.querySelector('body')
  );
};

export default Modal;
