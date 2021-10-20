import React from 'react';

const MentionWrapper = ({ displayName }) => {
  return <span className="mention-wrapper">@{displayName}</span>;
};

export default MentionWrapper;
