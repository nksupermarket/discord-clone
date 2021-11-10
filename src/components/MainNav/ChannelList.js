import React from 'react';

import ChannelLink from './ChannelLink';

import '../../styles/ChannelList.css';

const ChannelList = ({ list }) => {
  return (
    <ul className="channel-list">
      {list &&
        list.map((channel) => {
          return (
            <ChannelLink
              key={channel.id}
              channelID={channel.id}
              icon={channel.icon ? channel.icon : undefined}
              name={channel.icon ? undefined : channel.name}
            />
          );
        })}
    </ul>
  );
};

export default ChannelList;
