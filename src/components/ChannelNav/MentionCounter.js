import React from 'react';

import '../../styles/MentionCounter.css';

const MentionCounter = ({ count }) => {
  return <div className="mention-counter-wrapper">{count}</div>;
};

export default MentionCounter;
