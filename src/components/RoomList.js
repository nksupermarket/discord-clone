import React from 'react';

import '../styles/Sidebar.css';

const RoomList = ({ channelName, list, setRoomId }) => {
  return (
    <nav className="channel-nav sidebar">
      <header>{channelName}</header>
      <div className="room-list">
        {list.map((room) => (
          <div className="room" onClick={() => setRoomId(room.id)}>
            <a className="room-link" href="">
              {room.name}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default RoomList;
