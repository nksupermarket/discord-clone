import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  generateRandomUser,
  signIn,
  subscribeToChannel,
  updateMentions,
} from '../../logic/user_firebaseStuff';
import { ErrorContext } from '../../logic/contexts/ErrorContext';
import useInputValues from '../../logic/custom-hooks/useInputValues';
import { getUnixTime } from 'date-fns';

import Form from '../Form';
import { pushToMsgList } from '../../logic/room_firebaseStuff';

const LoginEmail = ({
  onRegister,
  onForgotPW,
  setUser,
  setLoading,
}) => {
  const { inputValues, handleChange } = useInputValues();
  const { setError } = useContext(ErrorContext);

  const history = useHistory();

  async function onCreateTestAcc() {
    try {
      setLoading(true);
      const user = await generateRandomUser(setUser);
      await Promise.all([
        subscribeToChannel(user, '-MqVZFTJg485ZZ2TUtZ0'),
        subscribeToChannel(user, '-MqVZFTPYJZ5kNMBKROY'),
        subscribeToChannel(user, '-MqVZFTRVp_uIzlJVmOp'),
        subscribeToChannel(user, '-MqVZFTShVKjPVWc-jyE'),
        pushWelcomeMsg(),
      ]);
      setLoading(false);
      // helper
      async function pushWelcomeMsg() {
        const msgID = await pushToMsgList('-MqVZG54pnPMmqDjLVRc', {
          msg: 'Hello there! undefined',
          user: '1',
          timestamp: getUnixTime(new Date()),
          mentions: [
            {
              uid: `${user.uid}`,
              range: {
                offset: 13,
                length: 9,
                key: 0,
              },
            },
          ],
        });
        await updateMentions(
          user.uid,
          '-MqVZFTShVKjPVWc-jyE',
          '-MqVZG54pnPMmqDjLVRc',
          msgID,
        );
      }
    } catch (error) {
      setError(error.message);
    }
  }

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
          {
            text: 'Generate account to test',
            onClick: onCreateTestAcc,
          },
        ]}
        handleChange={handleChange}
        submitAction={() =>
          signIn(inputValues.email, inputValues.password)
        }
        setError={setError}
        cleanUp={() => history.push('/')}
        inputValues={inputValues}
      />
    </div>
  );
};

export default LoginEmail;

LoginEmail.propTypes = {
  onRegister: PropTypes.func,
  onForgotPW: PropTypes.func,
  setUser: PropTypes.func,
  setLoading: PropTypes.func,
};
