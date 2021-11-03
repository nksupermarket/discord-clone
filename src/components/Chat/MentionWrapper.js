import React from 'react';

import '../../styles/MentionWrapper.css';

const MentionWrapper = ({ displayName, uid, id, mention, ...props }) => {
  displayName = displayName || mention.displayName;
  uid = uid || mention.uid;
  return (
    <span className="mention-wrapper" data-uid={uid} data-id={id}>
      @{displayName}
    </span>
  );
};

export default MentionWrapper;
