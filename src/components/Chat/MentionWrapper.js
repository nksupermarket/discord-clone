import React from 'react';

import '../../styles/MentionWrapper.css';

const MentionWrapper = ({ displayName, uid }) => {
  return (
    <span className="mention-wrapper" data-uid={uid}>
      @{displayName}
    </span>
  );
};

export default MentionWrapper;
