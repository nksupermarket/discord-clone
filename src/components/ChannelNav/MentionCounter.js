import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/MentionCounter.css';

const MentionCounter = ({ count }) => {
  return <div className="mention-counter-wrapper">{count}</div>;
};

export default MentionCounter;

MentionCounter.propTypes = {
  count: PropTypes.number,
};
