import React from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './Sidebar';

import '../../styles/Settings.css';

const Settings = ({ children, ...props }) => {
  console.log('settings running');
  return ReactDOM.createPortal(
    <div className="settings">
      <Sidebar {...props}></Sidebar>
      <main>{children}</main>
    </div>,
    document.querySelector('body')
  );
};

export default Settings;
