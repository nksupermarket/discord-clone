import React, { useContext, useRef, useReducer } from 'react';

import { logout } from '../../logic/user_firebaseStuff';
import { ErrorContext } from '../../logic/contexts/ErrorContext';

import Settings from '../Settings/Settings_desktop';
import MyAccount from './MyAccount_desktop';
import UserProfile from './UserProfile';
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

  function createSettingsButtonDetails(text, category, isDefault) {
    return {
      text,
      category,
      isDefault,
    };
  }
  return (
    <Settings
      close={close}
      categories={['user settings', 'none']}
      btnList={[
        createSettingsButtonDetails('my account', 'user settings', true),
        createSettingsButtonDetails('user profile', 'user settings'),
        createSettingsButtonDetails('log out', 'none'),
      ]}
      dispatch={dispatch}
    >
      {state && state}
    </Settings>
  );
};

export default UserSettings;
