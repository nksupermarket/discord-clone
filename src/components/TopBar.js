import React from 'react';
import PropTypes from 'prop-types';

import '../styles/TopBar.css';

import menuSVG from '../assets/svg/menu-fill.svg';
import userSVG from '../assets/svg/user-3-fill.svg';
import IconBtn from './IconBtn';

const TopBar = ({ room, isMobile, showUserList, showNav }) => {
  return (
    <section className={isMobile ? 'top-bar mobile' : 'top-bar'}>
      {room && (
        <header>
          {isMobile && (
            <nav>
              <IconBtn svg={menuSVG} onClick={showNav} />
            </nav>
          )}
          <div className="room-name-wrapper">{room.name}</div>
        </header>
      )}
      <div className="toolbar">
        {room && (
          <div className="channel-functions">
            {isMobile && (
              <IconBtn svg={userSVG} onClick={showUserList} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopBar;

TopBar.propTypes = {
  room: PropTypes.object,
  showUserList: PropTypes.func,
  showNav: PropTypes.func,
  isMobile: PropTypes.bool,
};
