import React, { useRef } from 'react';
import ReactDom from 'react-dom';
import { setRoomExitTimestamp } from '../../logic/room_firebaseStuff';

import '../../styles/ChannelNav.css';
import UserInfo from '../UserInfo/UserInfo';
import CatList from '../CatList';
import RoomLink from './RoomLink';

const ChannelNav = ({ channel, categories, list, unread, onRoomExit }) => {
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
                const isUnread = unread.includes(room.id);
                return (
                  <RoomLink
                    key={room.id}
                    isUnread={isUnread}
                    channel={channel}
                    room={room}
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
