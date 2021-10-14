import React from 'react';

import '../styles/TopBar.css';

const TopBar = ({ user, channel, room }) => {
  return (
    <section className="top-bar">
      {room && (
        <>
          <header className="room-name-wrapper">{room.name}</header>
          <div className="divider"></div>
          <div className="room-desc">{room.description}</div>
        </>
      )}
      <div className="toolbar">
        {room && <div className="channel-functions"></div>}
      </div>
    </section>
  );
};

export default TopBar;
