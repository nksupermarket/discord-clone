import React, { useState } from 'react';

import FlatBtn from './FlatBtn';
import IconBtn from './IconBtn';
import InputField from './InputField';

import closeSVG from '../assets/svg/close-line.svg';

import '../styles/Popup.css';

const Popup = ({
  className,
  title,
  subheader,
  fields,
  children,
  footerContent,
  validate,
  close,
}) => {
  const [info, setInfo] = useState({});
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="content">
            {fields.map((f) => (
              <InputField
                label={f.label}
                name={f.name}
                onChange={(e) =>
                  setInfo((prev) =>
                    setInfo({ ...prev, [e.target.name]: e.target.value })
                  )
                }
              />
            ))}
          </div>
          <footer>{footerContent}</footer>
        </form>
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
