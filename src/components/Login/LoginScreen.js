import React, { useState, useEffect } from 'react';

import LoginEmail from './LoginEmail';

import '../../styles/LoginScreen.css';
import LoginNewUser from './LoginNewUser';
import CreateAcc from './CreateAcc';
import { useParams } from 'react-router';

const LoginScreen = ({ setError }) => {
  const [node, setNode] = useState('new user');
  const [displayName, setDisplayName] = useState();

  const { channelID: channel } = useParams();

  return (
    <div className="modal">
      <div className="login-wrapper">
        {node === 'returning user' && (
          <LoginEmail
            setError={setError}
            onRegister={() => setNode('new user')}
          />
        )}
        {node === 'new user' && (
          <LoginNewUser
            channel={channel}
            onContinue={() => setNode('create acc')}
            onReturningUser={() => setNode('returning user')}
            setDisplayName={setDisplayName}
          />
        )}
        {node === 'create acc' && (
          <CreateAcc
            displayName={displayName}
            channel={channel}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
