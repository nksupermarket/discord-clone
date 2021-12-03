import React from 'react';

import Avatar from '../Avatar';

const ChannelListHeader = ({ visitingChannel }) => {
  return (
    <header>
      <div className="list-item home-icon">
        <Avatar color="#cb3e5b" />
      </div>
      {visitingChannel && (
        <div className="list-item avatar-wrapper">
          <Avatar
            channelName={visitingChannel.name}
            img={visitingChannel.icon}
          />
        </div>
      )}
      <div className="header-underline-wrapper list-item">
        <div className="header-underline"></div>
      </div>
    </header>
  );
};

export default ChannelListHeader;
