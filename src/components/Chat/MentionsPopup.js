import React, { useRef, useState, useEffect } from 'react';

import UserDisplay from '../OnlineUsers/UserDisplay';

import '../../styles/MentionsPopup.css';

const MentionsPopup = ({ children }) => {
  console.log(children);
  return (
    <div className="mentions-popup">
      <div className="suggestions-wrapper">
        <header>
          <h3>Members</h3>
        </header>
        <ul>{children}</ul>
      </div>
    </div>
  );
};

export default MentionsPopup;
