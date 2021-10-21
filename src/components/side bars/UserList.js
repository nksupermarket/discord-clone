import React, { useRef, useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import Avatar from '../Avatar';

import '../../styles/UserList.css';

const UserList = ({ list, roles }) => {
  roles = roles || [];

  const rolesRef = useRef({});

  const [userCountStrs, setUserCountStrs] = useState({});
  useEffect(() => {
    if (!rolesRef.current) return;

    for (const role in rolesRef.current) {
      const userCount = rolesRef.current[role]
        ? rolesRef.current[role].childNodes.length - 1
        : 0;

      userCount === 0
        ? rolesRef.current[role].classList.add('hidden')
        : rolesRef.current[role].classList.remove('hidden');

      setUserCountStrs((prev) => ({ ...prev, [role]: ` - ${userCount}` }));
    }
  }, [roles, list]);

  return (
    <aside className="users-ctn">
      {roles.map((role) => {
        return (
          <ul
            ref={(el) => (rolesRef.current[role] = el)}
            className="role-users-wrapper"
          >
            <header>
              <h2 className="caps-title">
                {role}
                {userCountStrs[role]}
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
