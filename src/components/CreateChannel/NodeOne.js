import React from 'react';

import FlatBtn from '../FlatBtn';
const NodeOne = () => {
  return (
    <div>
      <header>
        <h3>Tell us more about your server</h3>
        <p>
          In order to help you with your setup, is your new server for just a
          few friends or a larger community?
        </p>
      </header>
      <div>
        <FlatBtn />
        <FlatBtn />
      </div>
    </div>
  );
};

export default NodeOne;
