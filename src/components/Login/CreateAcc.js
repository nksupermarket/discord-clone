import React, { useState } from 'react';

import { validateEmail, validatePw } from '../../logic/formValidation';
import { createUser } from '../../logic/user_firebaseStuff';

import InputField from '../InputField';
import FlatBtn from '../FlatBtn';
import InputErrorMsg from '../InputErrorMsg';
import { useHistory } from 'react-router';

const CreateAcc = ({ serverInfo, displayName, channel, setError }) => {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [pw, setPw] = useState();

  const { isEmailValid, isPwValid, setValidStatus } = useValidStatus();

  const [formError, setFormError] = useState();

  function validateForm() {
    const isEmailValid = validateEmail(email);
    const isPwValid = validatePw(pw);
    setValidStatus({ isEmailValid, isPwValid });
    return isEmailValid && isPwValid;
  }

  async function submit() {
    if (!validateForm()) return;
    const isSuccess = createUser(
      email,
      pw,
      displayName,
      channel || null,
      setError
    );

    if (isSuccess) history.push(`/channels/${channel}`);
  }

  return (
    <div className="create-acc-ctn">
      <div className="server-info"></div>
      <form
        name="create-acc"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submitted');
          submit();
        }}
        action="#"
      >
        <header>
          <h3>Claim your account to chat</h3>
        </header>
        <div className="input-ctn">
          {formError && <InputErrorMsg error={formError} />}
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
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  );
};

export default CreateAcc;

function useValidStatus() {
  const [validStatus, setValidStatus] = useState({
    isEmailValid: true,
    isPwValid: true,
  });
  const { isEmailValid, isPwValid } = validStatus;
  return { isEmailValid, isPwValid, setValidStatus };
}
