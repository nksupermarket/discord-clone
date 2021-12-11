import React from 'react';
import PropTypes from 'prop-types';

import IconBtn from '../IconBtn';

import closeSVG from '../../assets/svg/close-circle-fill.svg';
import paperclipSVG from '../../assets/svg/attach_file_black_24dp.svg';

import '../../styles/AttachmentWrapper.css';

const AttachmentWrapper = ({ name, url, cancel }) => {
  return (
    <div className="attachment-wrapper">
      <div className="content">
        <div className="icon-wrapper">
          <img src={paperclipSVG} alt="uploaded file icon" />
        </div>
        {url ? (
          <a className="link-wrapper text-wrapper" href={url}>
            {name}
          </a>
        ) : (
          <div className="text-wrapper">{name}</div>
        )}
      </div>
      {cancel && (
        <div className="actions">
          <IconBtn svg={closeSVG} onClick={cancel} />
        </div>
      )}
    </div>
  );
};

export default AttachmentWrapper;

AttachmentWrapper.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  cancel: PropTypes.func,
};
