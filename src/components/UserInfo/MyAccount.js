import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AccountProfileCard from './AccountProfileCard';
import Divider from '../Settings/Divider';
import PasswordSection from './PasswordSection';
import AccountRemoval from './AccountRemoval';
import Modal from '../Modal';
import Popup from '../Popup';
import FlatBtn from '../FlatBtn';

const MyAccount = ({ user, editProfile }) => {
  const [popupDetails, setPopupDetails] = useState();

  useEffect(() => console.log(popupDetails));
  const defaultFooterContent = useMemo(
    () => (
      <div className="btn-ctn">
        <FlatBtn
          text="Cancel"
          isUnderline={true}
          onClick={() => setPopupDetails()}
        />
        <FlatBtn type="submit" text="Done" className="filled" />
      </div>
    ),
    []
  );

  const editUsername = useCallback(() => {
    setPopupDetails({
      className: 'settings-popup',
      title: 'Change your username',
      subheader: 'Enter a new username and your existing password',
      fields: [
        { label: 'username', name: 'new_username' },
        { label: 'current password', name: 'current_password' },
      ],
      footerContent: defaultFooterContent,
    });
  }, [defaultFooterContent]);

  const editEmail = useCallback(() => {
    setPopupDetails({
      className: 'settings-popup',
      title: 'Enter an email address',
      subheader: 'Enter a new email address and your existing password',
      fields: [
        { label: 'email', name: 'new_email' },
        { label: 'current password', name: 'current_password' },
      ],
      footerContent: defaultFooterContent,
    });
  }, [defaultFooterContent]);

  const editPassword = useCallback(() => {
    setPopupDetails({
      className: 'settings-popup',
      title: 'Enter an email address',
      subheader: 'Enter your current password and a new password',
      fields: [
        { label: 'current password', name: 'current_password' },
        { label: 'new password', name: 'new_password' },
        { label: 'confirm new password', name: 'confirm_password' },
      ],
      footerContent: defaultFooterContent,
    });
  }, [defaultFooterContent]);

  return (
    <>
      <section className="my_account">
        <header>
          <h2>My Account</h2>
        </header>
        <div className="inner-content">
          <AccountProfileCard
            user={user}
            editProfile={editProfile}
            editUsername={editUsername}
            editEmail={editEmail}
          />
          <Divider />
          <PasswordSection editPassword={editPassword} />
          <Divider />
          <AccountRemoval />
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
