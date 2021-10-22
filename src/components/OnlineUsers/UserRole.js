import React from 'react';

const UserRole = ({ rolesRef, role, userCountStr }) => {
  return (
    <ul
      ref={(el) => (rolesRef.current[role] = el)}
      className="role-users-wrapper"
    >
      <header>
        <h2 className="caps-title">
          {role}
          {userCountStr}
        </h2>
      </header>
    </ul>
  );
};

export default UserRole;
