import React from 'react';
import { Link } from 'react-router-dom';

import IconBtn from '../IconBtn';

const ChannelListHeader = () => {
  return (
    <header>
      <Link to="/" className="list-item">
        <IconBtn />
      </Link>
      <div className="header-underline-wrapper list-item">
        <div className="header-underline"></div>
      </div>
    </header>
  );
};

export default ChannelListHeader;
