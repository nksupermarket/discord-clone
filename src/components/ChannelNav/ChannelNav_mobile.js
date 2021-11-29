import React from 'react';

import '../../styles/ChannelNav.css';
import UserInfo from '../UserInfo/UserInfo_mobile';
import CatList from '../CatList';
import RoomLink from './RoomLink';

const ChannelNav = ({ channel, categories, list, showUserSettings }) => {
  categories = categories || [];
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
                return <RoomLink key={room.id} channel={channel} room={room} />;
              })}
          </CatList>
        ))}
      </div>
      <UserInfo showSettings={showUserSettings} />
    </nav>
  );
};

export default ChannelNav;
