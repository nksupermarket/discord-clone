import React from 'react';
import PropTypes from 'prop-types';

import IconBtn from './IconBtn';

import closeSVG from '../assets/svg/close-line.svg';

import '../styles/Popup.css';
import Form from './Form';

const Popup = ({
  className,
  title,
  subheader,
  fields,
  children,
  footerContent,
  close,
  isMobile,
  ...props
}) => {
  return (
    <div
      className={className ? className + ' popup' : 'popup'}
      onClick={(e) => e.stopPropagation()}
    >
      <header>
        <h3>{title}</h3>
        {subheader && (
          <div className="subheader">
            <span>{subheader}</span>
          </div>
        )}
        <IconBtn
          svg={closeSVG}
          onClick={close}
          className="close-btn"
        />
      </header>
      {fields && <Form fields={fields} close={close} {...props} />}
      {children && (
        <>
          <div className="content">{children}</div>
          <footer>{footerContent}</footer>
        </>
      )}
    </div>
  );
};

export default Popup;

Popup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subheader: PropTypes.string,
  fields: PropTypes.array,
  children: PropTypes.element,
  footerContent: PropTypes.element,
  close: PropTypes.func,
  isMobile: PropTypes.bool,
};
