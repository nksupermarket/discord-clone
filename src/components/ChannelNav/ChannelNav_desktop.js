import React, { useContext } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';

import UserInfo from '../UserInfo/UserInfo_desktop';
import CatList from '../CatList';
import RoomLink from './RoomLink';

import '../../styles/ChannelNav.css';

const ChannelNav = ({ channel, categories, list }) => {
  categories = categories || [];

  const { mentioned } = useContext(UserContext);

  return (
    <nav className="channel-nav sidebar">
      <header>{channel.name}</header>
      <div className="room-list">
        {categories.map((category, i) => (
          <CatList
            key={i}
            cat={category}
            isHeader={category === 'none' ? false : true}
            className="category-room-wrapper"
          >
            {list
              .filter((room) => {
                if (room.category === category) return true;
                if (!room.category && category === 'none') return true;
                return false;
              })
              .map((room) => {
                const hasMentions = !!mentioned?.[channel.id]?.[room.id];
                let mentionCount;
                if (hasMentions)
                  mentionCount = Object.keys(
                    mentioned[channel.id][room.id]
                  ).length;
                return (
                  <RoomLink
                    key={room.id}
                    channel={channel}
                    room={room}
                    mentionCount={mentionCount}
                  />
                );
              })}
          </CatList>
        ))}
      </div>
      <UserInfo />
    </nav>
  );
};

export default ChannelNav;
