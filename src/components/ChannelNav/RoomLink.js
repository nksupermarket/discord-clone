import React from 'react';
import { NavLink } from 'react-router-dom';

import unreadMarker from '../../assets/svg/edit-circle-fill.svg';

const RoomLink = ({ isUnread, channel, room }) => {
  return (
    <li className="room-link-item">
      {isUnread && (
        <div className="unread">
          <img src={unreadMarker} alt="unread room marker" />
        </div>
      )}

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
