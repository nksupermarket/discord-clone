import React from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from '../Avatar';

const ChannelLink = ({ channelId }) => {
  return (
    <NavLink to={`/channels/${channelId}`} activeClassName="selected">
      <div className="avatar-wrapper list-item">
        <Avatar />
      </div>
    </NavLink>
  );
};

export default ChannelLink;
