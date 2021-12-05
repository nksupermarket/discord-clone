import React from 'react';
import { NavLink } from 'react-router-dom';

import MentionCounter from '../ChannelNav/MentionCounter';

const RoomLink = ({ channel, room, mentionCount }) => {
  return (
    <li className="room-link-item">
      <NavLink
        to={`/channels/${channel.id}/${room.id}`}
        className="content"
        activeClassName="active"
      >
        <span>{room.name}</span>
        {mentionCount && <MentionCounter count={mentionCount} />}
      </NavLink>
    </li>
  );
};

export default RoomLink;
