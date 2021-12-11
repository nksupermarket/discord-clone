import React from 'react';
import PropTypes from 'prop-types';

import IconBtn from '../IconBtn';

import closeSVG from '../../assets/svg/close-circle-fill.svg';

import '../../styles/UploadProgress.css';

const UploadProgressWrapper = ({ task, cancel }) => {
  return (
    <div className="upload-progress-wrapper">
      <div className="content">
        Uploading <span className="text-wrapper">{task.name}</span>
        <span className="progress-wrapper">{task.progress}%</span>
      </div>

      <div className="actions">
        <IconBtn svg={closeSVG} onClick={cancel} />
      </div>
    </div>
  );
};

export default UploadProgressWrapper;

UploadProgressWrapper.propTypes = {
  task: PropTypes.object,
  cancel: PropTypes.func,
};
