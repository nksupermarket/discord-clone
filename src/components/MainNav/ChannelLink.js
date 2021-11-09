import React from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from '../Avatar';

const ChannelLink = ({ channelID, icon }) => {
  return (
    <NavLink to={`/channels/${channelID}`} activeClassName="selected">
      <div className="avatar-wrapper list-item">
        <Avatar img={icon} />
      </div>
    </NavLink>
  );
};

export default ChannelLink;
