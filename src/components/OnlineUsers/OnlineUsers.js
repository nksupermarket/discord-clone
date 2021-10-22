import React, { useRef, useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import '../../styles/OnlineUsers.css';
import UserRole from './UserRole';
import UserDisplay from './UserDisplay';

const OnlineUsers = ({ list, roles }) => {
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
          <UserRole
            rolesRef={rolesRef}
            role={role}
            userCountStr={userCountStrs[role]}
          />

          //each UserRole is given a ref in the rolesRef.current object
        );
      })}

      {list.map((user) => {
        const userDisplay = <UserDisplay displayName={user.displayName} />;

        if (
          //if user has a role, move UserDisplay to corresponding role
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

export default OnlineUsers;
