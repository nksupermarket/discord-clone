import React, { useState, useContext } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';
import { updateUserInfo, uploadAvatar } from '../../logic/user_firebaseStuff';
import useError from '../../logic/custom-hooks/useError';

import FlatBtn from '../FlatBtn';
import AccountProfileCard from '../UserInfo/AccountProfileCard';
import UploadFile from '../UploadFile';
import Error from '../Error';

import '../../styles/UserProfile.css';
import ProfileColorSwatch from './ProfileColorSwatch';

const UserProfile = () => {
  const { user, setUser, channelList } = useContext(UserContext);
  const [defaultColor] = useState(user.color);
  const [customColor, setCustomColor] = useState();
  const [isDefaultActive, setIsDefaultActive] = useState(true);
  const { error, setError } = useError();

  // event listeners
  function onChangeColor(e) {
    try {
      setIsDefaultActive(false);
      setCustomColor(e.target.value);
      updateUserInfo('color', e.target.value, setUser, channelList);
    } catch (error) {
      setError(error.message);
    }
  }
  function onDefaultClick() {
    try {
      setIsDefaultActive(true);
      updateUserInfo('color', defaultColor, setUser, channelList);
    } catch (error) {
      setError(error.message);
    }
  }
  function onCustomClick() {
    try {
      setIsDefaultActive(false);
      updateUserInfo('color', customColor, setUser, channelList);
    } catch (error) {
      setError(error.message);
    }
  }
  async function handleAvatarChange(img) {
    try {
      const photoURL = await uploadAvatar(user.uid, img);
      updateUserInfo('avatar', photoURL, setUser, channelList);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      {error && <Error errorMsg={error} />}
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
                  <UploadFile handleIcon={handleAvatarChange}>
                    <div className="flat-btn filled">Change Avatar</div>
                  </UploadFile>
                </div>
              </div>
              <div className="customization-wrapper">
                <h3 className="caps-title">Profile Color</h3>
                <div className="btn-ctn">
                  <ProfileColorSwatch
                    isDefault={true}
                    isActive={isDefaultActive}
                    color={defaultColor}
                    onClick={onDefaultClick}
                  />
                  <ProfileColorSwatch
                    color={customColor}
                    isActive={!isDefaultActive}
                    onChange={onChangeColor}
                    onClick={onCustomClick}
                  />
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
    </>
  );
};

export default UserProfile;
