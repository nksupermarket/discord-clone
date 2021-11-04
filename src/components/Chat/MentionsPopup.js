import React from 'react';

import '../../styles/MentionsPopup.css';

const MentionsPopup = ({ children, active }) => {
  return (
    <div className="mentions-popup">
      <div className="suggestions-wrapper">
        <header>
          <h3>Members</h3>
        </header>
        {children.length > 0 ? (
          <ul>{children}</ul>
        ) : (
          <div className="text-wrapper">
            <span>No users match</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentionsPopup;
