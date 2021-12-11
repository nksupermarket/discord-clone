import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Modal = ({ close, children }) => {
  return ReactDOM.createPortal(
    <div className="modal" onClick={close}>
      {children}
    </div>,
    document.querySelector('body'),
  );
};

export default Modal;

Modal.propTypes = {
  close: PropTypes.func,
  children: PropTypes.element,
};
