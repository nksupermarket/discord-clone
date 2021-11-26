import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { signIn } from '../../logic/user_firebaseStuff';
import { ErrorContext } from '../../logic/contexts/ErrorContext';
import useInputValues from '../../logic/custom-hooks/useInputValues';

import Form from '../Form';

const LoginEmail = ({ onRegister, onForgotPW }) => {
  const { inputValues, handleChange } = useInputValues();
  const { setError } = useContext(ErrorContext);

  const history = useHistory();

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
        cleanUp={() => history.push('/')}
      />
    </div>
  );
};

export default LoginEmail;
