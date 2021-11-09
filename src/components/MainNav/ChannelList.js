import React from 'react';

import ChannelLink from './ChannelLink';

const ChannelList = ({ list }) => {
  return (
    <ul className="channel-list">
      {list &&
        list.map((channel) => {
          return (
            <ChannelLink
              key={channel.id}
              channelID={channel.id}
              icon={channel.icon}
            />
          );
        })}
    </ul>
  );
};

export default ChannelList;
