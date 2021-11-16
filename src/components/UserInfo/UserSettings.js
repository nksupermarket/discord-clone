import React, { useReducer } from 'react';

import Settings from '../Settings/Settings';
import MyAccount from './MyAccount';
import UserProfile from './UserProfile';
import Notifications from './Notifications';

const UserSettings = ({ close }) => {
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
        case 'notifications':
          return <Notifications />;
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
    <Settings
      close={close}
      categories={['user settings', 'app settings', 'none']}
      btnList={[
        createSettingsButton('my account', 'user settings'),
        createSettingsButton('user profile', 'user settings'),
        createSettingsButton('notifications', 'app settings'),
        createSettingsButton('log out', 'none'),
      ]}
      dispatch={dispatch}
    >
      {state && state}
    </Settings>
  );
};

export default UserSettings;
