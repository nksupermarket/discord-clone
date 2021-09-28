import React from 'react';

import '../styles/UserList.css';

const UserList = ({ list }) => {
  return (
    <aside className="users-ctn">
      {list.map((user) => (
        <li className="user-wrapper">
          <div className="avatar"></div>
          {/*<img className="avatar" src={user.avatar} alt={user.name} /> */}
          <span>{user.name}</span>
        </li>
      ))}
    </aside>
  );
};

export default UserList;
