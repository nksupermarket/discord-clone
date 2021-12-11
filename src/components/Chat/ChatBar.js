import React from 'react';
import PropTypes from 'prop-types';

import AttachmentWrapper from '../Upload/AttachmentWrapper';
import ChatBarInput from './ChatBarInput';
import UploadFile from '../Upload/UploadFile';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';

import '../../styles/MentionsPopup.css';
import 'draft-js/dist/Draft.css';

const ChatBar = ({
  replyTo,
  attachments,
  handleNewAttachments,
  removeAttachment,
  ...props
}) => {
  const style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };
  return (
    <div className="chatbar-content" style={style}>
      <div className="chatbar-wrapper">
        <div className="add-wrapper">
          <UploadFile
            handleFile={handleNewAttachments}
            actionOnChange="set attachment"
          >
            <div className="icon-btn">
              <img src={addCircleSvg} alt="upload a file" />
            </div>
          </UploadFile>
        </div>
        <ChatBarInput
          replyTo={replyTo}
          isAttachments={attachments.length > 0}
          {...props}
        />
      </div>
      {attachments.length > 0 && (
        <div className="attachments-ctn">
          {attachments.map((f, idx) => {
            return (
              <AttachmentWrapper
                key={idx}
                name={f.name}
                cancel={() => removeAttachment(f)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatBar;

ChatBar.propTypes = {
  replyTo: PropTypes.objectOf(PropTypes.string),
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
  handleNewAttachments: PropTypes.func,
  removeAttachment: PropTypes.func,
};
