import React from 'react';
import IconBtn from './IconBtn';

import closeSVG from '../assets/svg/close-circle-fill.svg';
import paperclipSVG from '../assets/svg/paperclip.svg';

import '../styles/UploadProgress.css';

const UploadProgress = ({ isCompleted, file, cancel }) => {
  return (
    <div className="upload-progress-wrapper">
      {isCompleted ? (
        <div className="fileURL-wrapper">
          <img src={paperclipSVG} alt="uploaded file icon" />
          <a href={file.url}>{file.name}</a>
        </div>
      ) : (
        <div className="text-wrapper">
          Uploading {file.name.substring(0, 7)} {file.progress}%
        </div>
      )}
      <div className="icon-wrapper">
        <IconBtn svg={closeSVG} onClick={cancel} />
      </div>
    </div>
  );
};

export default UploadProgress;
