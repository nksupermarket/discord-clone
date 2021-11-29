import React, { useContext, useState } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';

import Avatar from '../Avatar';
import IconBtn from '../IconBtn';
import UserSettings from './UserSettings';

import '../../styles/UserInfo.css';
import settingsSVG from '../../assets/svg/settings-3-fill.svg';

const UserInfo = () => {
  const { user } = useContext(UserContext);
  const [isSettings, setIsSettings] = useState(false);
  return (
    <>
      <section className="user-info-panel">
        <div className="ctn">
          <Avatar img={user.photoURL} color={user.color} />
          <div className="name-tag">
            <div className="username-wrapper">{user.displayName}</div>
          </div>
          <div className="btn-ctn">
            <IconBtn
              svg={settingsSVG}
              onClick={() => {
                setIsSettings(true);
              }}
            />
          </div>
        </div>
      </section>
      {isSettings && <UserSettings close={() => setIsSettings(false)} />}
    </>
  );
};

export default UserInfo;
