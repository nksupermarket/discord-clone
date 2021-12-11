import React from 'react';
import PropTypes from 'prop-types';

import FlatBtn from '../FlatBtn';

const PasswordSection = ({ editPassword }) => {
  return (
    <div className="user-settings-password margin-top-40">
      <header className="section-title">
        <h2>Password and Authentication</h2>
      </header>
      <div className="inner-content">
        <FlatBtn
          text="Change Password"
          className="filled"
          onClick={editPassword}
        />
      </div>
    </div>
  );
};

export default PasswordSection;

PasswordSection.propTypes = {
  editPassword: PropTypes.func,
};
