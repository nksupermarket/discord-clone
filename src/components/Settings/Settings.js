import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './Sidebar';

const Settings = ({ ...props }) => {
  return ReactDOM.createPortal(
    <div className="settings">
      <Sidebar {...props}></Sidebar>
    </div>,
    document.querySelector('body')
  );
};

export default Settings;
