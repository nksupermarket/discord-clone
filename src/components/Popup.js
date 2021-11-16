import React, { useState } from 'react';

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
  submitAction,
  close,
}) => {
  const [info, setInfo] = useState({});

  function handleChange(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div
      className={className ? className + ' popup' : 'popup'}
      onClick={(e) => e.stopPropagation()}
    >
      <header>
        <h3>{title}</h3>
        <div className="subheader">
          <span>{subheader}</span>
        </div>
        <IconBtn svg={closeSVG} onClick={close} className="close-btn" />
      </header>
      {fields && (
        <Form
          handleChange={handleChange}
          fields={fields}
          submitAction={submitAction}
          close={close}
        />
      )}
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
