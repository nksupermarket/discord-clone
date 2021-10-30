import React from 'react';

import UserDisplay from '../OnlineUsers/UserDisplay';

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
        {list.map((obj) => (
          <UserDisplay displayName={obj.displayName} />
        ))}
      </ul>
    </div>
  );
};

export default MentionsPopup;
