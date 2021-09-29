import React, { useState } from 'react';

import { validateEmail, validatePw } from '../logic/formValidation';

import InputField from './InputField';
import FlatBtn from './FlatBtn';
import InputErrorMsg from './InputErrorMsg';

const CreateAcc = ({ serverInfo, createUser }) => {
  const [email, setEmail] = useState();
  const [pw, setPw] = useState();

  const { isEmailValid, isPwValid, setValidStatus } = useValidStatus();

  const [error, setError] = useState();

  function validateForm() {
    const isEmailValid = validateEmail(email);
    const isPwValid = validatePw(pw);
    setValidStatus({ isEmailValid, isPwValid });
    return isEmailValid && isPwValid;
  }

  return (
    <div className="create-acc-ctn">
      <div className="server-info"></div>
      <form
        name="create-acc"
        onSubmit={(e) => {
          e.preventDefault();
          if (validateForm()) createUser(email, pw, setError);
        }}
      >
        <header>
          <h3>Claim your account to chat</h3>
        </header>
        <div className="input-ctn">
          {error && <InputErrorMsg error={error} />}
          <InputField
            label="Email"
            type="email"
            onChange={setEmail}
            valid={isEmailValid}
          />
          {!isEmailValid && (
            <InputErrorMsg error="something wrong with your email" />
          )}
          <InputField
            label="Password"
            type="password"
            onChange={setPw}
            valid={isPwValid}
          />
          {!isPwValid && (
            <InputErrorMsg error="password must be at 6 characters and contain at least one uppercase letter, number, and special character" />
          )}
        </div>
        <FlatBtn
          type="submit"
          text="Next"
          onClick={() => {
            if (validateForm()) createUser(email, pw, setError);
          }}
        />
      </form>
    </div>
  );
};

export default CreateAcc;

function useValidStatus() {
  const [validStatus, setValidStatus] = useState({
    isEmailValid: false,
    isPwValid: false,
  });
  const { isEmailValid, isPwValid } = validStatus;
  return { isEmailValid, isPwValid, setValidStatus };
}
