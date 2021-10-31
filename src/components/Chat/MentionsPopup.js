import React from 'react';

import UserDisplay from '../OnlineUsers/UserDisplay';

import '../../styles/MentionsPopup.css';

const MentionsPopup = ({ userList, query }) => {
  console.log(query);
  let list = queryUserList(query);

  function queryUserList(query) {
    return userList
      .sort((a, b) => {
        if (a.displayName === b.displayName) return 0;
        return a.displayName > b.displayName ? 1 : -1;
      })
      .filter((obj) => obj.displayName.includes(query))
      .filter((obj, i) => i < 5);
  }
  return (
    <div className="mentions-popup">
      <ul>
        <header>
          <h3>Members</h3>
        </header>
        {list.map((obj) => (
          <UserDisplay displayName={obj.displayName} />
        ))}
      </ul>
    </div>
  );
};

export default MentionsPopup;
