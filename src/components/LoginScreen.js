import React, { useState } from 'react';

import LoginEmail from './LoginEmail';

import '../styles/LoginScreen.css';
import LoginNewUser from './LoginNewUser';
import CreateAcc from './CreateAcc';

const LoginScreen = ({ createUser, signIn, serverInfo }) => {
  const [node, setNode] = useState('new user');
  const [displayName, setDisplayName] = useState();

  return (
    <div className="modal">
      <div className="login-wrapper">
        {node === 'returning user' && (
          <LoginEmail signIn={signIn} onRegister={() => setNode('new user')} />
        )}
        {node === 'new user' && (
          <LoginNewUser
            serverInfo={serverInfo}
            onContinue={() => setNode('create acc')}
            onReturningUser={() => setNode('returning user')}
            setDisplayName={setDisplayName}
          />
        )}
        {node === 'create acc' && (
          <CreateAcc
            createUser={(email, pw, setError) =>
              createUser(email, pw, displayName, setError)
            }
          />
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
