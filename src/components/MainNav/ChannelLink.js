import React from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from '../Avatar';

const ChannelLink = ({ channelID, roomID, icon, name }) => {
  return (
    <NavLink
      to={(location) => ({
        ...location,
        pathname: `/channels/${channelID}/${roomID}`,
      })}
      activeClassName="selected"
    >
      <div className="avatar-wrapper list-item">
        <Avatar img={icon} channelName={name} />
      </div>
    </NavLink>
  );
};

export default ChannelLink;
