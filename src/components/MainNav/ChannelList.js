import React from 'react';

import ChannelLink from './ChannelLink';

const ChannelList = ({ list }) => {
  return (
    <ul className="channel-list">
      {list &&
        list.map((channel) => {
          return <ChannelLink key={channel.id} channelId={channel.id} />;
        })}
    </ul>
  );
};

export default ChannelList;
