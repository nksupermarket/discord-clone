import React from 'react';

import InputField from './InputField';
import FlatBtn from './FlatBtn';

const LoginNewUser = ({
  serverInfo,
  setDisplayName,
  onContinue,
  onReturningUser,
}) => {
  return (
    <form name="new-user-username" onSubmit={(e) => e.preventDefault()}>
      <header>
        <h4>You are invited to join</h4>
        <h2>{serverInfo.name}</h2>
      </header>
      <InputField label="Username" type="text" onChange={setDisplayName} />
      <FlatBtn
        text="Continue"
        type="submit"
        onClick={onContinue}
        onKeyDown={(e) => {
          if ((e.key = 'Enter')) {
            e.preventDefault();
            onContinue();
          }
        }}
      />
      <span className="link" onClick={onReturningUser}>
        Already have an account?
      </span>
    </form>
  );
};

export default LoginNewUser;
