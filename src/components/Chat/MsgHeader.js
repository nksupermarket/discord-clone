import React from 'react';

import { convertTimestampToString } from '../../logic/date';

const MsgHeader = ({ displayName, timestamp }) => {
  return (
    <header>
      <span className="display-name">{displayName}</span>
      <span className="timestamp">{convertTimestampToString(timestamp)}</span>
    </header>
  );
};

export default MsgHeader;
