import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar';

const ChannelListHeader = () => {
  return (
    <header>
      <Link to="/" className="list-item">
        <Avatar color="#cb3e5b" />
      </Link>
      <div className="header-underline-wrapper list-item">
        <div className="header-underline"></div>
      </div>
    </header>
  );
};

export default ChannelListHeader;
