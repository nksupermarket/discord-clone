import React, { useState, useEffect } from 'react';

import useInputValues from '../../logic/custom-hooks/useInputValues';

import LoginEmail from './LoginEmail';

import '../../styles/LoginScreen.css';
import LoginNewUser from './LoginNewUser';
import CreateAcc from './CreateAcc';
import { useParams, useHistory } from 'react-router';
import ResetPassword from './ResetPassword';

import loginArtwork from '../../assets/png/Waffle_Coffee Dessert.png';

const LoginScreen = ({ setUser, setError }) => {
  const [node, setNode] = useState('returning user');
  const { inputValues: newUserInfo, handleChange } = useInputValues();
  const { channelID: channel } = useParams();

  const history = useHistory();
  // useEffect(() => {
  //   if (!channel) history.push('/login/-MkoRSxTqkrS9mlivGfs');
  // }, [channel, history]);

  function goHome() {
    setNode('returning user');
  }

  return (
    <div className="login-screen">
      <div className="login-formWrapper">
        {
          {
            'returning user': (
              <LoginEmail
                setError={setError}
                onRegister={() => setNode('new user')}
                onForgotPW={() => setNode('reset pw')}
              />
            ),
            'new user': (
              <LoginNewUser
                channel={channel}
                onContinue={() => setNode('create acc')}
                onReturningUser={() => setNode('returning user')}
                handleChange={handleChange}
                close={goHome}
              />
            ),
            'create acc': (
              <CreateAcc
                newUserInfo={newUserInfo}
                goBack={() => setNode('new user')}
                handleChange={handleChange}
                Menu
                Game
                channel={channel}
                setError={setError}
                setUser={setUser}
              />
            ),
            'reset pw': <ResetPassword setError={setError} close={goHome} />,
          }[node]
        }
      </div>
      <div className="login-artwork-wrapper">
        <div className="artwork">
          <img src={loginArtwork} alt="illustration of bread and coffee" />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
