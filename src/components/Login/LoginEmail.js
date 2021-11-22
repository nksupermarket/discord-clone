import React, { useState } from 'react';

import { signIn } from '../../logic/user_firebaseStuff';
import useInputValues from '../../logic/custom-hooks/useInputValues';

import Form from '../Form';

const LoginEmail = ({ onRegister, onForgotPW, setError }) => {
  const { inputValues, handleChange } = useInputValues();

  return (
    <div className="login login-email">
      <header>
        <h3>Welcome to bread!</h3>
        <h4>a discord clone</h4>
      </header>
      <Form
        fields={[
          { label: 'Email', type: 'email', name: 'email' },
          { label: 'Password', type: 'password', name: 'password' },
        ]}
        noCancelBtn={true}
        textBtns={[
          { text: 'Forgot your password?', onClick: onForgotPW },
          { text: 'Need an account? Register', onClick: onRegister },
        ]}
        handleChange={handleChange}
        submitAction={() => signIn(inputValues.email, inputValues.password)}
        setError={setError}
        cleanUp={() => 'do nothing'}
      />
    </div>
  );
};

export default LoginEmail;
