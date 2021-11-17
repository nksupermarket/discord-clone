import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AccountProfileCard from './AccountProfileCard';
import Divider from '../Settings/Divider';
import PasswordSection from './PasswordSection';
import AccountRemoval from './AccountRemoval';
import Modal from '../Modal';
import Popup from '../Popup';

import {
  updateUserEmail,
  updateUsername,
  updateUserPassword,
  removeUser,
} from '../../logic/user_firebaseStuff';

const MyAccount = ({ editProfile }) => {
  const [popupDetails, setPopupDetails] = useState();

  const editUsername = useCallback(() => {
    setPopupDetails({
      className: 'settings-popup',
      title: 'Change your username',
      subheader: 'Enter a new username and your existing password',
      fields: [
        { label: 'username', name: 'new_username', type: 'text' },
        {
          label: 'current password',
          name: 'current_password',
          type: 'password',
        },
      ],
      submitAction: updateUsername,
    });
  }, []);

  const editEmail = useCallback(() => {
    setPopupDetails({
      className: 'settings-popup',
      title: 'Enter an email address',
      subheader: 'Enter a new email address and your existing password',
      fields: [
        { label: 'email', name: 'new_email', type: 'email' },
        {
          label: 'current password',
          name: 'current_password',
          type: 'password',
        },
      ],
      submitAction: updateUserEmail,
    });
  }, []);

  const editPassword = useCallback(() => {
    setPopupDetails({
      className: 'settings-popup',
      title: 'Enter an email address',
      subheader: 'Enter your current password and a new password',
      fields: [
        {
          label: 'current password',
          name: 'current_password',
          type: 'password',
        },
        { label: 'new password', name: 'new_password', type: 'password' },
        {
          label: 'confirm new password',
          name: 'confirm_password',
          type: 'password',
        },
      ],
      submitAction: updateUserPassword,
    });
  }, []);

  const deleteAcc = useCallback(() => {
    setPopupDetails({
      className: 'settings-popup',
      title: 'Delete Account',
      subheader:
        'Are you sure you want to delete your account? This will immediately log you out of your account and you will not be able to log in again. Forever.',
      fields: [
        {
          label: 'password',
          name: 'password',
          type: 'password',
        },
      ],
      actionBtnText: 'Delete Account',
      submitAction: removeUser,
    });
  }, []);

  return (
    <>
      <section className="my_account">
        <header>
          <h2>My Account</h2>
        </header>
        <div className="inner-content">
          <AccountProfileCard
            editProfile={editProfile}
            editUsername={editUsername}
            editEmail={editEmail}
          />
          <Divider />
          <PasswordSection editPassword={editPassword} />
          <Divider />
          <AccountRemoval deleteAcc={deleteAcc} />
        </div>
      </section>
      {popupDetails && (
        <Modal close={() => setPopupDetails()}>
          <Popup close={() => setPopupDetails()} {...popupDetails}></Popup>
        </Modal>
      )}
    </>
  );
};

export default MyAccount;
