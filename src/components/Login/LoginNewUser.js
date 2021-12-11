import React from 'react';
import PropTypes from 'prop-types';

import Form from '../Form';

const LoginNewUser = ({
  channel,
  handleChange,
  onContinue,
  onReturningUser,
  close,
  inputValues,
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
        fields={[
          { type: 'text', name: 'username', label: 'username' },
        ]}
        actionBtnText="Continue"
        textBtns={[
          {
            text: 'Already have an account?',
            onClick: onReturningUser,
          },
        ]}
        handleChange={handleChange}
        submitAction={onContinue}
        cleanUp={() => 'do nothing'}
        close={close}
        inputValues={inputValues}
      />
    </div>
  );
};

export default LoginNewUser;

LoginNewUser.propTypes = {
  channel: PropTypes.objectOf(PropTypes.string),
  handleChange: PropTypes.func,
  onContinue: PropTypes.func,
  onReturningUser: PropTypes.func,
  close: PropTypes.func,
  inputValues: PropTypes.object,
};
