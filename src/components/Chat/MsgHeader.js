import React from 'react';
import PropTypes from 'prop-types';

import { convertTimestampToString } from '../../logic/date';

const MsgHeader = ({ displayName, timestamp }) => {
  return (
    <header>
      <span className="display-name">{displayName}</span>
      <span className="timestamp">
        {convertTimestampToString(timestamp)}
      </span>
    </header>
  );
};

export default MsgHeader;

MsgHeader.propTypes = {
  displayName: PropTypes.string,
  timestamp: PropTypes.number,
};
