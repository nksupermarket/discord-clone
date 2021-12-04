import React from 'react';
import IconBtn from '../IconBtn';

import closeSVG from '../../assets/svg/close-circle-fill.svg';

import '../../styles/UploadProgress.css';

const UploadProgressWrapper = ({ isCompleted, task, cancel }) => {
  return (
    <div className="upload-progress-Wrapper">
      <div className="content">
        Uploading {task.name.substring(0, 7)} {task.progress}%
      </div>

      <div className="actions">
        <IconBtn svg={closeSVG} onClick={cancel} />
      </div>
    </div>
  );
};

export default UploadProgressWrapper;
