import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

import useTouchEvents from '../../logic/custom-hooks/useTouchEvents';

import Sidebar from './Sidebar';
import IconBtn from '../IconBtn';
import MobileSidebar from '../MobileSidebar';

import closeSVG from '../../assets/svg/close-line.svg';

import '../../styles/Settings.css';

const Settings = ({ close, children, ...props }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const closeSidebar = useCallback(() => {
    setShowSidebar(false);
  }, []);
  const openSidebar = useCallback(() => {
    setShowSidebar(true);
  }, []);
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchEvents(
    closeSidebar,
    openSidebar
  );
  return ReactDOM.createPortal(
    <div
      className="settings mobile"
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      {showSidebar && (
        <MobileSidebar
          isLeft={true}
          className="sidebar-region"
          hide={closeSidebar}
        >
          <div className="sidebar-scroller">
            <Sidebar {...props}></Sidebar>
          </div>
        </MobileSidebar>
      )}
      <div className="content-region">
        <div className="content-transition-wrapper">
          <div className="content-scroller">
            <main className="content">{children}</main>
            <div className="actions">
              <IconBtn svg={closeSVG} onClick={close} className={'close-btn'} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('body')
  );
};

export default Settings;
