import React, { useState, useEffect, useRef, useContext } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';
import { updateUserInfo, uploadAvatar } from '../../logic/user_firebaseStuff';
import { ErrorContext } from '../../logic/contexts/ErrorContext';

import FlatBtn from '../FlatBtn';
import AccountProfileCard from './AccountProfileCard';
import UploadFile from '../UploadFile';

import '../../styles/UserProfile.css';
import ProfileColorSwatch from './ProfileColorSwatch';
import Success from '../Success';
import useSuccess from '../../logic/custom-hooks/useSuccess';

const UserProfile = () => {
  const { user, setUser, channelList } = useContext(UserContext);
  const [defaultColor] = useState(user.color);
  const [customColor, setCustomColor] = useState();
  const [isDefaultActive, setIsDefaultActive] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(user.photoURL);
  const [loading, setLoading] = useState();
  const avatarFileRef = useRef();
  const { setError } = useContext(ErrorContext);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  });

  const { success: changesSaved, setSuccess: setChangesSaved } =
    useSuccess(isMounted);
  useEffect(() => {
    if (changesSaved)
      setTimeout(() => {
        if (isMounted.current) setChangesSaved(false);
      }, 3500);
  });

  // event listeners
  function onChangeColor(e) {
    setIsDefaultActive(false);
    setCustomColor(e.target.value);
  }
  function onDefaultClick() {
    setIsDefaultActive(true);
  }
  function onCustomClick() {
    if (customColor) setIsDefaultActive(false);
  }
  async function handleAvatarChange(img) {
    setAvatarPreview(img);
  }
  function removeAvatar() {
    setAvatarPreview('');
    avatarFileRef.current = '';
  }
  async function saveChanges() {
    try {
      setLoading(true);
      let photoURL = avatarFileRef.current
        ? await uploadAvatar(user.uid, avatarFileRef.current)
        : '';
      await updateUserInfo('avatar', photoURL, setUser, channelList);
      await updateUserInfo(
        'color',
        isDefaultActive ? defaultColor : customColor,
        setUser,
        channelList
      );
      if (isMounted.current) {
        setLoading(false);
        setChangesSaved(true);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      {changesSaved && <Success text={'Saved changes'} />}
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
                  <UploadFile
                    handlePreview={handleAvatarChange}
                    handleUpload={(file) => (avatarFileRef.current = file)}
                    isPreview={false}
                  >
                    <div className="flat-btn filled">Change Avatar</div>
                  </UploadFile>
                  {avatarPreview && (
                    <FlatBtn
                      text={'Remove Avatar'}
                      isUnderline={true}
                      onClick={removeAvatar}
                    />
                  )}
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
              <div className="customization-wrapper">
                <div className="btn-ctn">
                  <FlatBtn
                    text="Save Changes"
                    className="hollow"
                    loading={loading}
                    onClick={saveChanges}
                  />
                </div>
              </div>
            </div>
            <div className="customization-wrapper preview">
              <h3 className="caps-title header-secondary">Preview</h3>
              <AccountProfileCard
                isSmall={true}
                handleAvatarChange={handleAvatarChange}
                avatarPreview={avatarPreview}
                bannerColor={isDefaultActive ? defaultColor : customColor}
                handleUpload={(file) => (avatarFileRef.current = file)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
