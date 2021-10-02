import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Sidebar.css';

const RoomList = ({ channel, list, setRoom }) => {
  return (
    <nav className="channel-nav sidebar">
      <header>{channel.name}</header>
      <div className="room-list">
        {list.map((room) => (
          <ol
            className="room"
            onClick={() => setRoom({ id: room.id, name: room.name })}
          >
            <Link to={`/channels/${channel.id}/${room.id}`}>
              <li className="room-link">{room.name}</li>
            </Link>
          </ol>
        ))}
      </div>
    </nav>
  );
};

export default RoomList;
