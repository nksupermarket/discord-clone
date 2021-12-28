import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/MentionWrapper.css';

const MentionWrapper = ({
  displayName,
  uid,
  id,
  mention,
  ...props
}) => {
  displayName = displayName || mention?.displayName;
  uid = uid || mention?.uid;
  return (
    <span className="mention-wrapper" data-uid={uid} data-id={id}>
      @{displayName}
      <span style={{ display: 'none' }}>{props.children}</span>
    </span>
  );
};

export default MentionWrapper;

MentionWrapper.propTypes = {
  displayName: PropTypes.string,
  uid: PropTypes.string,
  id: PropTypes.string,
  mention: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
