import React from 'react';

import '../../styles/MentionWrapper.css';

const MentionWrapper = ({ displayName, uid, id }) => {
  return (
    <span
      className="mention-wrapper"
      data-uid={uid}
      data-id={id}
      contentEditable={false}
    >
      @{displayName}
    </span>
  );
};

export default MentionWrapper;
