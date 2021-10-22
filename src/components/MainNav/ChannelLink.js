import React from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from '../Avatar';

const ChannelLink = ({ channel }) => {
  return (
    <NavLink to={`/channels/${channel.id}`} activeClassName="selected">
      <div className="avatar-wrapper list-item">
        <Avatar />
      </div>
    </NavLink>
  );
};

export default ChannelLink;
