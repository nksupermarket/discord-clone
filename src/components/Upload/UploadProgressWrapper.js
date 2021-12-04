import React from 'react';
import IconBtn from '../IconBtn';

import closeSVG from '../../assets/svg/close-circle-fill.svg';

import '../../styles/UploadProgress.css';

const UploadProgressWrapper = ({ isCompleted, task, cancel }) => {
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
