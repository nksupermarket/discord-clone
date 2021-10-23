import React, { useRef, useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import '../../styles/OnlineUsers.css';
import UserRole from './UserRole';
import UserDisplay from './UserDisplay';
import useUserCountStrs from '../../logic/custom-hooks/useUserCountStrs';

const OnlineUsers = ({ list, roles }) => {
  roles = roles || [];

  const rolesRef = useRef({});

  const userCountStrs = useUserCountStrs(list, rolesRef);

  return (
    <aside className="users-ctn">
      {roles.map((role, i) => {
        return (
          //each UserRole is given a ref in the rolesRef.current object
          <UserRole
            key={i}
            rolesRef={rolesRef}
            role={role}
            userCountStr={userCountStrs[role]}
          />
        );
      })}

      {list.map((user, i) => {
        const userDisplay = (
          <UserDisplay key={i} displayName={user.displayName} />
        );

        if (Object.keys(rolesRef.current).length === 0) return <></>;
        if (
          //if user has a role, move UserDisplay to corresponding role
          user.role
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
