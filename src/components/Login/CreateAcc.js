import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { createUser } from '../../logic/user_firebaseStuff';

import Form from '../Form';

const CreateAcc = ({
  newUserInfo,
  handleChange,
  channel,
  setUser,
  goBack,
  setError,
}) => {
  const history = useHistory();

  return (
    <div className="login create-acc">
      <header>
        <h3>Just one more step...</h3>
      </header>
      <Form
        fields={[
          { type: 'email', label: 'Email', name: 'email' },
          { type: 'password', label: 'Password', name: 'password' },
        ]}
        actionBtnText={'Create Account'}
        cancelBtnText={'Go Back'}
        close={goBack}
        handleChange={handleChange}
        submitAction={() =>
          createUser(
            newUserInfo.email,
            newUserInfo.password,
            newUserInfo.username,
            channel || null,
            setUser
          )
        }
        cleanUp={() => {
          if (channel) history.push(`/channels/${channel}`);
        }}
        setError={setError}
      />
    </div>
  );
};

export default CreateAcc;
