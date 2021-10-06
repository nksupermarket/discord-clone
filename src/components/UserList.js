import React, { useRef, useEffect } from 'react';
import ReactDom from 'react-dom';

import '../styles/UserList.css';

const UserList = ({ list, roles }) => {
  roles = roles || [];

  const rolesRef = useRef({});

  useEffect(() => console.log(rolesRef.current));

  return (
    <aside className="users-ctn">
      {roles.map((role) => (
        <ul
          ref={(el) => (rolesRef.current[role] = el)}
          className="role-users-wrapper"
        >
          <header>{role}</header>
        </ul>
      ))}

      {list.map((user) => {
        const userDisplay = (
          <li className="user-wrapper">
            <div className="avatar"></div>
            {/*<img className="avatar" src={user.avatar} alt={user.name} /> */}
            <span>{user.displayName}</span>
          </li>
        );

        if (user.role && roles.includes(user.role))
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
