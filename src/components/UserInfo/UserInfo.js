import React from 'react';

import Avatar from '../Avatar';

const UserInfo = () => {
  return (
    <section className="user-info-panel">
      <Avatar />
      <div className="name-tag"></div>
      <div className="btn-ctn"></div>
    </section>
  );
};

export default UserInfo;
