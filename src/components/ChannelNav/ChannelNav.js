import React, { useRef } from 'react';
import ReactDom from 'react-dom';
import { setRoomExitTimestamp } from '../../logic/room_firebaseStuff';

import '../../styles/ChannelNav.css';
import RoomCategory from './RoomCategory';
import RoomLink from './RoomLink';

const ChannelNav = ({ channel, categories, list, unread, onRoomExit }) => {
  categories = categories || [];

  const categoriesRef = useRef({});

  return (
    <nav className="channel-nav sidebar">
      <header>{channel.name}</header>
      <div className="room-list">
        {categories.map((category, i) => (
          <RoomCategory
            key={i}
            categoriesRef={categoriesRef}
            category={category}
          />

          //each RoomCategory is given a ref in the categoriesRef.current object
        ))}

        {list.map((room) => {
          let isUnread = unread.includes(room.id);

          const roomLink = (
            <RoomLink
              key={room.id}
              isUnread={isUnread}
              channel={channel}
              room={room}
            />
          );

          if (!categoriesRef.current) return null;
          if (
            //if room belongs in a category, move RoomLink to corresponding category
            room.category &&
            categories.includes(room.category) &&
            categoriesRef.current[room.category]
          )
            return ReactDom.createPortal(
              roomLink,
              categoriesRef.current[room.category]
            );
          return ReactDom.createPortal(roomLink, categoriesRef.current['none']);
        })}
      </div>
    </nav>
  );
};

export default ChannelNav;
