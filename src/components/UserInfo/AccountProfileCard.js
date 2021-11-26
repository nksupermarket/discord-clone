import React, { useContext } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';

import Field from '../Settings/Field';
import FlatBtn from '../FlatBtn';
import Avatar from '../Avatar';

import '../../styles/AccountProfileCard.css';
import UploadFile from '../UploadFile';

const AccountProfileCard = ({
  editProfile,
  editUsername,
  editEmail,
  isSmall,
  handleAvatarChange,
  avatarPreview,
  bannerColor,
  handleUpload,
}) => {
  const { user } = useContext(UserContext);
  console.log(user.displayName);
  return (
    <div className="account-profile-card">
      <div
        className="banner"
        style={{ background: bannerColor ? bannerColor : user.color }}
      ></div>
      <div className="user-info">
        {isSmall ? (
          <UploadFile
            handlePreview={handleAvatarChange}
            handleUpload={handleUpload}
            isPreview={false}
          >
            <Avatar img={avatarPreview} color={user.color} />
          </UploadFile>
        ) : (
          <Avatar img={user.photoURL} color={user.color} />
        )}
        <div className="profile-card-username">{user.displayName}</div>
        {!isSmall && (
          <FlatBtn
            text={'Edit User Profile'}
            className={'filled'}
            onClick={editProfile}
          />
        )}
      </div>
      {!isSmall && (
        <div className="background">
          <div className="field-list">
            <Field
              item="username"
              display={user.displayName}
              onClick={editUsername}
            />
            <Field item="email" display={user.email} onClick={editEmail} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountProfileCard;
