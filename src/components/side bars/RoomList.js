import React, { useRef, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import { setRoomExitTimestamp } from '../../logic/room_firebaseStuff';

import '../../styles/Sidebar.css';

import unreadMarker from '../../assets/svg/edit-circle-fill.svg';

const RoomList = ({
  channel,
  currentRoom,
  categories,
  list,
  unread,
  setRoom,
  onRoomExit,
}) => {
  categories = categories || [];

  const categoriesRef = useRef({});

  return (
    <nav className="channel-nav sidebar">
      <header>{channel.name}</header>
      <div className="room-list">
        {categories.map((category) => (
          <ul
            ref={(el) => (categoriesRef.current[category] = el)}
            className="category-room-wrapper"
          >
            {category !== 'none' && (
              <header>
                <h2 className="caps-title">{category}</h2>
              </header>
            )}
          </ul>
        ))}

        {list.map((room) => {
          let isUnread = unread.includes(room.id);

          let style = {};
          if (room.id === currentRoom.id)
            style = { background: 'rgba(201, 201, 201, 0.1)' };
          const roomLink = (
            <li className="room-link-item">
              {isUnread && (
                <div className="unread">
                  <img src={unreadMarker} alt="unread room marker" />
                </div>
              )}

              <Link
                to={`/channels/${channel.id}/${room.id}`}
                onClick={() => setRoom({ id: room.id, name: room.name })}
                className="content"
                style={style}
              >
                <span>{room.name}</span>
              </Link>
            </li>
          );

          if (!categoriesRef.current) return null;
          if (
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

export default RoomList;
