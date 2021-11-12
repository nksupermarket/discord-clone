import React from 'react';

import Field from '../Settings/Field';
import FlatBtn from '../FlatBtn';
import Avatar from '../Avatar';

import '../../styles/AccountProfileCard.css';

const AccountProfileCard = ({ displayName, email }) => {
  return (
    <div className="account-profile-card">
      <div className="banner"></div>
      <div className="user-info">
        <Avatar />
        <div className="profile-card-username">{displayName}</div>
        <FlatBtn text={'Edit User Profile'} className={'filled'} />
      </div>
      <div className="background">
        <div className="field-list">
          <Field item="username" display={displayName} />
          <Field item="email" display={email} />
        </div>
      </div>
    </div>
  );
};

export default AccountProfileCard;
