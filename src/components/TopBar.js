import React from 'react';

import '../styles/TopBar.css';

const TopBar = ({ room }) => {
  return (
    <section className="top-bar">
      {room && <header className="room-name-wrapper">{room.name}</header>}
      <div className="toolbar">
        {room && <div className="channel-functions"></div>}
      </div>
    </section>
  );
};

export default TopBar;
