import React, { useState } from 'react';

import { sendPWResetEmail } from '../../logic/user_firebaseStuff';

import Form from '../Form';

const ResetPassword = ({ close, setError }) => {
  const [email, setEmail] = useState();
  return (
    <div className="login reset-password">
      <header>
        <h3>Reset your password</h3>
      </header>
      <Form
        fields={[{ type: 'email', name: 'email', label: 'Email' }]}
        actionBtnText="Send email"
        submitAction={() => sendPWResetEmail(email)}
        setError={setError}
        handleChange={(e) => setEmail(e.target.value)}
        close={close}
      />
    </div>
  );
};

export default ResetPassword;
