import React, { useRef, useState, useEffect } from 'react';

import UserDisplay from '../OnlineUsers/UserDisplay';

import '../../styles/MentionsPopup.css';

const MentionsPopup = ({ listRef, msg }) => {
  const ref = useRef();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    // duct tape solution to show popup on '@' trigger
    setTimeout(() => setIsActive(!!ref.current.querySelector('li')), 100);
  }, [msg]);

  const style = isActive ? { opacity: 1 } : { opacity: 0 };

  return (
    <div className="mentions-popup" ref={ref} style={style}>
      <div className="suggestions-wrapper" ref={listRef}>
        <header>
          <h3>Members</h3>
        </header>
      </div>
    </div>
  );
};

export default MentionsPopup;
