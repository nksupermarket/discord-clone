import React from 'react';
import AccountProfileCard from './AccountProfileCard';
import Divider from '../Settings/Divider';
import PasswordSection from './PasswordSection';
import AccountRemoval from './AccountRemoval';

const MyAccount = ({ ...props }) => {
  return (
    <section className="my_account">
      <header>
        <h2>My Account</h2>
      </header>
      <div className="inner-content">
        <AccountProfileCard {...props} />
        <Divider />
        <PasswordSection />
        <Divider />
        <AccountRemoval />
      </div>
    </section>
  );
};

export default MyAccount;
