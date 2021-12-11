import React, {
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { ErrorContext } from '../../logic/contexts/ErrorContext';
import useSuccess from '../../logic/custom-hooks/useSuccess';

import { sendPWResetEmail } from '../../logic/user_firebaseStuff';

import Form from '../Form';
import Success from '../Success';

const ResetPassword = ({ close }) => {
  const [email, setEmail] = useState();
  const { setError } = useContext(ErrorContext);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  });
  const { success, setSuccess } = useSuccess();

  return (
    <>
      {success && <Success text={'Password reset email sent'} />}
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
          cleanUp={() => setSuccess(true)}
          close={close}
          inputValues={{ email }}
        />
      </div>
    </>
  );
};

export default ResetPassword;

ResetPassword.propTypes = {
  close: PropTypes.func,
};
