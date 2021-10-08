import React, { useRef, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';

import '../styles/Sidebar.css';

const RoomList = ({ channel, categories, list, setRoom }) => {
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
          const roomLink = (
            <Link to={`/channels/${channel.id}/${room.id}`}>
              <li
                className="room-link"
                onClick={() => setRoom({ id: room.id, name: room.name })}
              >
                <div className="unread"></div>
                <div className="content">
                  <span>{room.name}</span>
                </div>
              </li>
            </Link>
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
