import React from 'react';

import Field from '../Settings/Field';
import FlatBtn from '../FlatBtn';
import Avatar from '../Avatar';

import '../../styles/AccountProfileCard.css';

const AccountProfileCard = ({ user }) => {
  return (
    <div className="account-profile-card">
      <div className="banner"></div>
      <div className="user-info">
        <Avatar img={user.photoURL} />
        <div className="profile-card-username">{user.displayName}</div>
        <FlatBtn text={'Edit User Profile'} className={'filled'} />
      </div>
      <div className="background">
        <div className="field-list">
          <Field item="username" display={user.displayName} />
          <Field item="email" display={user.email} />
        </div>
      </div>
    </div>
  );
};

export default AccountProfileCard;
