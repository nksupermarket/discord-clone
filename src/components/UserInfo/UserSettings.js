import React, { useReducer } from 'react';

import Settings from '../Settings/Settings';
import MyAccount from './MyAccount';
import UserProfile from './UserProfile';
import Notifications from './Notifications';

const UserSettings = ({ user }) => {
  const [content, setContent] = useReducer((state, swapTo) => {
    switch (swapTo) {
      case 'my account':
        return <MyAccount user={user} />;
      case 'user profile':
        return <UserProfile />;
      case 'notifications':
        return <Notifications />;
      default:
        throw new Error("that doesn't exist!");
    }
  }, <MyAccount user={user} />);

  console.log('running');

  function createSettingsButton(text, category) {
    return {
      text,
      category,
    };
  }
  return (
    <Settings
      categories={['user settings', 'app settings', 'none']}
      btnList={[
        createSettingsButton('my account', 'user settings'),
        createSettingsButton('user profile', 'user settings'),
        createSettingsButton('notifications', 'app settings'),
        createSettingsButton('log out', 'none'),
      ]}
      reducer={setContent}
    >
      {content}
    </Settings>
  );
};

export default UserSettings;
