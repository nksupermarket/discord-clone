import React from 'react';
import AccountProfileCard from './AccountProfileCard';

const MyAccount = ({ ...props }) => {
  return (
    <section className="my_account">
      <header>
        <h2>My Account</h2>
      </header>
      <div className="inner-content">
        <AccountProfileCard {...props} />
      </div>
    </section>
  );
};

export default MyAccount;
