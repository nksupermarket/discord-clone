import React from 'react';

import UserDisplay from '../OnlineUsers/UserDisplay';

const MentionsPopup = ({ possibleMentions }) => {
  return (
    <div className="mentions-popup">
      <ul>
        {possibleMentions.map((obj) => {
          <UserDisplay />;
        })}
      </ul>
    </div>
  );
};

export default MentionsPopup;
