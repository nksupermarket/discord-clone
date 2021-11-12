import React from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './Sidebar';

import '../../styles/Settings.css';

const Settings = ({ children, ...props }) => {
  return ReactDOM.createPortal(
    <div className="settings">
      <Sidebar {...props}></Sidebar>
      <main className="content">{children}</main>
    </div>,
    document.querySelector('body')
  );
};

export default Settings;
