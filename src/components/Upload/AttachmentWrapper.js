import React from 'react';

import IconBtn from '../IconBtn';

import closeSVG from '../../assets/svg/close-circle-fill.svg';
import paperclipSVG from '../../assets/svg/attach_file_black_24dp.svg';

import '../../styles/AttachmentWrapper.css';

const AttachmentWrapper = ({ file, cancel }) => {
  return (
    <div className="attachment-wrapper">
      <div className="content">
        <div className="icon-wrapper">
          <img src={paperclipSVG} alt="uploaded file icon" />
        </div>
        <div className="text-wrapper">{file.name}</div>
      </div>
      <div className="actions">
        <IconBtn svg={closeSVG} onClick={cancel} />
      </div>
    </div>
  );
};

export default AttachmentWrapper;
