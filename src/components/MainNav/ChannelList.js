import React from 'react';

import ChannelLink from './ChannelLink';

const ChannelList = ({ list }) => {
  return (
    <ul className="channel-list">
      {list &&
        list.map((channel) => {
          return <ChannelLink channel={channel} />;
        })}
    </ul>
  );
};

export default ChannelList;
