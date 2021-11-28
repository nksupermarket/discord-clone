import React from 'react';
import Avatar from '../Avatar';

import '../../styles/ChannelCard.css';

const ChannelCard = ({ channel }) => {
  return (
    <div className="channel-info-card default_transition">
      <header>
        <div className="channel-main-info">
          <Avatar img={channel.icon} channelName={channel.name} />
          <div className="channel-name-wrapper">{channel.name}</div>
        </div>
      </header>
      <div className="content">
        <div className="channel-desc-wrapper">{channel.description}</div>
      </div>
    </div>
  );
};

export default ChannelCard;
