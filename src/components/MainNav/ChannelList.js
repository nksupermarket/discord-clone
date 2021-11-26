import React, { useContext } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';

import ChannelLink from './ChannelLink';

import '../../styles/ChannelList.css';

const ChannelList = () => {
  const { channelList: list } = useContext(UserContext);
  return (
    <ul className="channel-list">
      {list &&
        list.map((channel) => {
          return (
            <ChannelLink
              key={channel.id}
              channelID={channel.id}
              roomID={Object.keys(channel.defaultRoom)[0]}
              icon={channel.icon ? channel.icon : undefined}
              name={channel.icon ? undefined : channel.name}
            />
          );
        })}
    </ul>
  );
};

export default ChannelList;
