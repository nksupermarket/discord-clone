import React, { useState } from 'react';

import useInputValues from '../../logic/custom-hooks/useInputValues';

import LoginEmail from './LoginEmail';

import LoginNewUser from './LoginNewUser';
import CreateAcc from './CreateAcc';
import { useParams } from 'react-router';
import ResetPassword from './ResetPassword';

import loginArtwork from '../../assets/png/Waffle_Coffee_Dessert.png';

import '../../styles/LoginScreen.css';

const LoginScreen = ({ setUser, isMobile, setLoading }) => {
  const [node, setNode] = useState('returning user');
  const { inputValues: newUserInfo, handleChange } = useInputValues();
  const { channelID: channel } = useParams();

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
                onRegister={() => setNode('new user')}
                onForgotPW={() => setNode('reset pw')}
                setUser={setUser}
                setLoading={setLoading}
              />
            ),
            'new user': (
              <LoginNewUser
                channel={channel}
                onContinue={() => setNode('create acc')}
                onReturningUser={() => setNode('returning user')}
                handleChange={handleChange}
                close={goHome}
                inputValues={newUserInfo}
              />
            ),
            'create acc': (
              <CreateAcc
                newUserInfo={newUserInfo}
                goBack={() => setNode('new user')}
                handleChange={handleChange}
                channel={channel}
                setUser={setUser}
                inputValues={newUserInfo}
              />
            ),
            'reset pw': <ResetPassword close={goHome} />,
          }[node]
        }
      </div>
      {!isMobile && (
        <div className="login-artwork-wrapper">
          <div className="artwork">
            <img src={loginArtwork} alt="illustration of bread and coffee" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
