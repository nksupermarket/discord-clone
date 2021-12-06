import React, { useContext } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';

import ChannelLink from './ChannelLink';

import '../../styles/ChannelList.css';

const ChannelList = () => {
  const { channelList: list, mentioned } = useContext(UserContext);

  return (
    <ul className="channel-list">
      {list &&
        list.map((channel) => {
          const hasMentions = !!mentioned?.[channel.id];
          let mentionCount = 0;
          if (hasMentions) {
            for (const room in mentioned[channel.id]) {
              mentionCount += Object.keys(mentioned[channel.id][room]).length;
            }
          }
          return (
            <li key={channel.id} className="channelLink-wrapper">
              <ChannelLink
                channelID={channel.id}
                icon={channel.icon ? channel.icon : undefined}
                name={channel.name}
                mentionCount={mentionCount}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ChannelList;
