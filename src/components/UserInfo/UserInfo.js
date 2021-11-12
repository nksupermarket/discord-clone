import React, { useState } from 'react';

import Avatar from '../Avatar';
import IconBtn from '../IconBtn';
import UserSettings from './UserSettings';

import '../../styles/UserInfo.css';
import settingsSVG from '../../assets/svg/settings-3-fill.svg';

const UserInfo = ({ user }) => {
  const [isSettings, setIsSettings] = useState(false);
  return (
    <>
      <section className="user-info-panel">
        <div className="ctn">
          <Avatar img={user.photoURL} />
          <div className="name-tag">
            <div className="username-wrapper">{user.displayName}</div>
          </div>
          <div className="btn-ctn">
            <IconBtn svg={settingsSVG} onClick={() => setIsSettings(true)} />
          </div>
        </div>
      </section>
      {isSettings && <UserSettings user={user} />}
    </>
  );
};

export default UserInfo;
