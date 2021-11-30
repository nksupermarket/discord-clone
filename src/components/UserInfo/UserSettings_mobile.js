import React, { useState, useCallback, useContext, useReducer } from 'react';

import { logout } from '../../logic/user_firebaseStuff';
import { ErrorContext } from '../../logic/contexts/ErrorContext';

import Settings from '../Settings/Settings _mobile';
import MyAccount from './MyAccount _mobile';
import UserProfile from './UserProfile_mobile';
import Error from '../Error';

const UserSettings = ({ close }) => {
  const { SetError } = useContext(ErrorContext);
  const [state, dispatch] = useReducer((state, action) => {
    if (action.type === 'swap_to') {
      switch (action.payload) {
        case 'my account':
          return (
            <MyAccount
              editProfile={() =>
                dispatch({ type: 'swap_to', payload: 'user profile' })
              }
            />
          );
        case 'user profile':
          return <UserProfile />;
        case 'log out':
          onLogout();
          async function onLogout() {
            try {
              await logout();
            } catch (error) {
              SetError(error.message);
            }
          }
          break;
        default:
          throw new Error("that doesn't exist!");
      }
    }
  }, <MyAccount editProfile={() => dispatch({ type: 'swap_to', payload: 'user profile' })} />);

  return (
    <Settings
      close={close}
      categories={['user settings', 'none']}
      btnList={[
        createSettingsButton('my account', 'user settings'),
        createSettingsButton('user profile', 'user settings'),
        createSettingsButton('log out', 'none'),
      ]}
      // active={}
      dispatch={dispatch}
    >
      {state && state}
    </Settings>
  );
};

export default UserSettings;

function createSettingsButton(text, category) {
  return {
    text,
    category,
  };
}
