import React from 'react';
import PropTypes from 'prop-types';

import FlatBtn from '../FlatBtn';

const AccountRemoval = ({ deleteAcc }) => {
  return (
    <div className="user-settings-acc_removal margin-top-40">
      <header style={{ marginBottom: '10px' }}>
        <h3 className="caps-title header-secondary">
          account removal
        </h3>
      </header>
      <div className="inner-content">
        <div
          className="subtext header-secondary"
          style={{ marginBottom: '10px' }}
        >
          <span>Deleting your account will remove it forever</span>
        </div>
        <FlatBtn
          text="Delete Account"
          className="hollow"
          onClick={deleteAcc}
        />
      </div>
    </div>
  );
};

export default AccountRemoval;

AccountRemoval.propTypes = {
  deleteAcc: PropTypes.func,
};
