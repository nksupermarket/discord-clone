import React from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './Sidebar';
import IconBtn from '../IconBtn';

import closeSVG from '../../assets/svg/close-line.svg';

import '../../styles/Settings.css';

const Settings = ({ close, children, ...props }) => {
  return ReactDOM.createPortal(
    <div className="settings">
      <div className="sidebar-region">
        <div className="sidebar-scroller">
          <Sidebar {...props}></Sidebar>
        </div>
      </div>
      <div className="content-region">
        <div className="content-scroller">
          <main className="content">{children}</main>
          <div className="actions">
            <IconBtn svg={closeSVG} onClick={close} className={'close-btn'} />
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('body')
  );
};

export default Settings;
