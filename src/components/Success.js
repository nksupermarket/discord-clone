import React from 'react';
import ReactDOM from 'react-dom';

import checkSVG from '../assets/svg/check-line.svg';

import '../styles/Success.css';

const Success = ({ text }) => {
  return ReactDOM.createPortal(
    <div id="success-popup">
      <div className="svg-wrapper">
        <img src={checkSVG} alt="success" />
      </div>
      <div className="success-msg">{text}</div>
    </div>,
    document.querySelector('body')
  );
};

export default Success;
