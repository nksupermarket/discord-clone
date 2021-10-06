import React, { useRef, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';

import '../styles/Sidebar.css';

const RoomList = ({ channel, categories, list, setRoom }) => {
  categories = categories || [];

  const categoriesRef = useRef({});
  console.log(categories);
  useEffect(() => console.log(categoriesRef.current));

  return (
    <nav className="channel-nav sidebar">
      <header>{channel.name}</header>
      <div className="room-list">
        {categories.map((category) => (
          <ul
            ref={(el) => (categoriesRef.current[category] = el)}
            className="category-room-wrapper"
          >
            {category !== 'none' && <header>{category}</header>}
          </ul>
        ))}

        {list.map((room) => {
          const roomLink = (
            <Link to={`/channels/${channel.id}/${room.id}`}>
              <li
                className="room-link"
                onClick={() => setRoom({ id: room.id, name: room.name })}
              >
                {room.name}
              </li>
            </Link>
          );

          if (room.category && categories.includes(room.category))
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
