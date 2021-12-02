import React, { useContext } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';

import Avatar from '../Avatar';
import IconBtn from '../IconBtn';

import '../../styles/UserInfo.css';
import settingsSVG from '../../assets/svg/settings-3-fill.svg';

const UserInfo = ({ showSettings }) => {
  const { user } = useContext(UserContext);
  return (
    <section className="user-info-panel">
      <div className="ctn">
        <Avatar img={user.photoURL} color={user.color} />
        <div className="name-tag">
          <div className="username-wrapper">{user.displayName}</div>
        </div>
        <div className="btn-ctn">
          <IconBtn svg={settingsSVG} onClick={showSettings} />
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
