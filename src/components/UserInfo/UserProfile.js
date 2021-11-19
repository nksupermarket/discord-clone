import React, { useContext } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';
import FlatBtn from '../FlatBtn';
import AccountProfileCard from '../UserInfo/AccountProfileCard';
import UploadFile from '../UploadFile';

import '../../styles/UserProfile.css';
import ProfileColorSwatch from './ProfileColorSwatch';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  return (
    <section className="user_profile">
      <header>
        <h2>User Profile</h2>
      </header>
      <div className="inner-content">
        <div className="row-layout">
          <div>
            <div className="customization-wrapper">
              <h3 className="caps-title header-secondary">Avatar</h3>
              <div className="btn-ctn">
                <UploadFile>
                  <div className="flat-btn filled">Change Avatar</div>
                </UploadFile>
              </div>
            </div>
            <div className="customization-wrapper">
              <h3 className="caps-title">Profile Color</h3>
              <div className="btn-ctn">
                <ProfileColorSwatch isDefault={true} color={user.color} />
                <ProfileColorSwatch />
              </div>
            </div>
          </div>
          <div className="customization-wrapper preview">
            <h3 className="caps-title header-secondary">Preview</h3>
            <AccountProfileCard isSmall={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
