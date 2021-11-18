import React, { useRef } from 'react';

import '../../styles/OnlineUsers.css';
import CatList from '../CatList';
import UserDisplay from './UserDisplay';
import useUserCountStrs from '../../logic/custom-hooks/useUserCountStrs';

const OnlineUsers = ({ list, roles }) => {
  roles = roles || [];

  const rolesRef = useRef({});

  const userCountStrs = useUserCountStrs(list, roles, rolesRef);

  return (
    <aside className="users-ctn">
      {roles.map((role, i) => {
        return (
          //each UserRole is given a ref in the rolesRef.current object
          <CatList
            key={i}
            catRef={(el) => (rolesRef.current[role] = el)}
            cat={role}
            headerSubtext={userCountStrs[role]}
            className="role-users-wrapper"
          >
            {list
              .filter((user) => {
                if (user.role === role) return true;
                if (!user.role && role === 'Online') return true;
                return false;
              })
              .map((user) => (
                <UserDisplay
                  key={user.uid}
                  displayName={user.displayName}
                  avatar={user.avatar}
                  color={user.color}
                />
              ))}
          </CatList>
        );
      })}
    </aside>
  );
};

export default OnlineUsers;
