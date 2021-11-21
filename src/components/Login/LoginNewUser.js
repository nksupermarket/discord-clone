import React from 'react';

import InputField from '../InputField';
import FlatBtn from '../FlatBtn';
import Form from '../Form';

const LoginNewUser = ({
  channel,
  handleChange,
  onContinue,
  onReturningUser,
  close,
}) => {
  return (
    <div className="login new-user-username">
      {channel ? (
        <header>
          <h4>You are invited to join</h4>
          <h2>{channel.name}</h2>
        </header>
      ) : (
        <header>
          <h3>Create an account</h3>
        </header>
      )}
      <Form
        fields={[{ type: 'text', name: 'username', label: 'username' }]}
        actionBtnText="Continue"
        textBtns={[
          { text: 'Already have an account?', onClick: onReturningUser },
        ]}
        handleChange={handleChange}
        submitAction={onContinue}
        cleanUp={onContinue}
        close={close}
      />
    </div>
  );
};

export default LoginNewUser;
