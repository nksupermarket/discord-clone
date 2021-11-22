import React, { useReducer } from 'react';
import { useHistory } from 'react-router';

import { logout } from '../../logic/user_firebaseStuff';
import useError from '../../logic/custom-hooks/useError';

import Settings from '../Settings/Settings';
import MyAccount from './MyAccount';
import UserProfile from './UserProfile';
import Error from '../Error';

const UserSettings = ({ close }) => {
  const history = useHistory();

  const { error, SetError } = useError();
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
              history.push('/login');
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

  function createSettingsButton(text, category) {
    return {
      text,
      category,
    };
  }
  return (
    <>
      {error && <Error errorMsg={error} />}
      <Settings
        close={close}
        categories={['user settings', 'none']}
        btnList={[
          createSettingsButton('my account', 'user settings'),
          createSettingsButton('user profile', 'user settings'),
          createSettingsButton('log out', 'none'),
        ]}
        dispatch={dispatch}
      >
        {state && state}
      </Settings>
    </>
  );
};

export default UserSettings;
