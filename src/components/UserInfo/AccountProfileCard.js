import React from 'react';

import Field from '../Settings/Field';
import FlatBtn from '../FlatBtn';
import Avatar from '../Avatar';

import '../../styles/AccountProfileCard.css';

const AccountProfileCard = ({ user, editProfile, editUsername, editEmail }) => {
  return (
    <div className="account-profile-card">
      <div className="banner"></div>
      <div className="user-info">
        <Avatar img={user.photoURL} />
        <div className="profile-card-username">{user.displayName}</div>
        <FlatBtn
          text={'Edit User Profile'}
          className={'filled'}
          onClick={editProfile}
        />
      </div>
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
    </div>
  );
};

export default AccountProfileCard;
