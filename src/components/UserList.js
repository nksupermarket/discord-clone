import React, { useRef, useEffect } from 'react';
import ReactDom from 'react-dom';

import Avatar from './Avatar';

import '../styles/UserList.css';

const UserList = ({ list, roles }) => {
  roles = roles || [];

  const rolesRef = useRef({});

  return (
    <aside className="users-ctn">
      {roles.map((role) => {
        const userCount = rolesRef.current[role]
          ? rolesRef.current[role].childNodes.length - 1
          : 0;
        const userCountStr = ` - ${userCount}`;

        let className = 'role-users-wrapper';

        if (userCount === 0) className += ' hidden';
        return (
          <ul ref={(el) => (rolesRef.current[role] = el)} className={className}>
            <header>
              <h2 className="caps-title">
                {role}
                {userCount > 0 && userCountStr}
              </h2>
            </header>
          </ul>
        );
      })}

      {list.map((user) => {
        const userDisplay = (
          <li className="user-wrapper">
            <Avatar />
            {/*<img className="avatar" src={user.avatar} alt={user.name} /> */}
            <div className="content">
              <span>{user.displayName}</span>

              <span className="subText"></span>
            </div>
          </li>
        );

        if (
          user.role &&
          roles.includes(user.role) &&
          rolesRef.current[user.role]
        )
          return ReactDom.createPortal(
            userDisplay,
            rolesRef.current[user.role]
          );
        return ReactDom.createPortal(userDisplay, rolesRef.current.Online);
      })}
    </aside>
  );
};

export default UserList;
