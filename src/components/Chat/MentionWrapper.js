import React from 'react';

import '../../styles/MentionWrapper.css';

const MentionWrapper = ({ displayName }) => {
  return <span className="mention-wrapper">@{displayName}</span>;
};

export default MentionWrapper;
