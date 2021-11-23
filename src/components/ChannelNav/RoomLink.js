import React from 'react';
import { NavLink } from 'react-router-dom';

const RoomLink = ({ channel, room }) => {
  return (
    <li className="room-link-item">
      <NavLink
        to={`/channels/${channel.id}/${room.id}`}
        className="content"
        activeClassName="active"
      >
        <span>{room.name}</span>
      </NavLink>
    </li>
  );
};

export default RoomLink;
