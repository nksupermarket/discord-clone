import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';

import { updateUserInfo, removeUser } from '../../logic/user_firebaseStuff';
import useInputValues from '../../logic/custom-hooks/useInputValues';
import { UserContext } from '../../logic/contexts/UserContext';
import { ErrorContext } from '../../logic/contexts/ErrorContext';

import Field from '../Settings/Field';
import Divider from '../Settings/Divider';
import PasswordSection from './PasswordSection';
import AccountRemoval from './AccountRemoval';
import Modal from '../Modal';
import Popup from '../Popup_mobile';

const MyAccount = () => {
  const { user, setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { channelList } = useContext(UserContext);

  const [popupDetails, setPopupDetails] = useState();
  const { inputValues, handleChange, resetInputValues } = useInputValues();

  const editUsername = useCallback(() => {
    setPopupDetails({
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
      inputsToSubmit: 'new_username',
    });
  }, []);
  const updateUsername = useCallback(async () => {
    await updateUserInfo(
      'displayName',
      inputValues.new_username,
      setUser,
      channelList
    );
  }, [inputValues.new_username, setUser, channelList]);

  const editEmail = useCallback(() => {
    setPopupDetails({
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
      inputsToSubmit: 'new_email',
    });
  }, []);
  const updateEmail = useCallback(async () => {
    await updateUserInfo('email', inputValues.new_email, setUser);
  }, [inputValues.new_email, setUser]);

  const editPassword = useCallback(() => {
    setPopupDetails({
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
      inputsToSubmit: 'new_password',
    });
  }, []);
  const updatePassword = useCallback(async () => {
    await updateUserInfo('password', inputValues.new_password);
  }, [inputValues.new_password]);

  const deleteAcc = useCallback(() => {
    setPopupDetails({
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

  const getSubmitAction = useCallback(() => {
    switch (
      popupDetails.inputsToSubmit //get submit action based which popupDetails is active
    ) {
      case 'new_username':
        return updateUsername;
      case 'new_email':
        return updateEmail;
      case 'new_password':
        return updatePassword;
      default:
        return;
    }
  }, [
    updateUsername,
    updatePassword,
    updateEmail,
    popupDetails?.inputsToSubmit,
  ]);

  return (
    <>
      <section className="my_account">
        <header>
          <h2>My Account</h2>
        </header>
        <div className="inner-content">
          <div className="field-list">
            <Field
              item="username"
              display={user.displayName}
              onClick={editUsername}
            />
            <Field item="email" display={user.email} onClick={editEmail} />
          </div>
          <Divider />
          <PasswordSection editPassword={editPassword} />
          <Divider />
          <AccountRemoval deleteAcc={deleteAcc} />
        </div>
      </section>
      {popupDetails && (
        <Modal
          close={() => {
            setPopupDetails();
            resetInputValues();
          }}
        >
          <Popup
            close={() => {
              setPopupDetails();
              resetInputValues();
            }}
            handleChange={handleChange}
            className="settings-popup"
            {...popupDetails}
            submitAction={getSubmitAction()}
            setError={setError}
          ></Popup>
        </Modal>
      )}
    </>
  );
};

export default MyAccount;
