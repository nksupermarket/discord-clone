import React, { useState } from 'react';

import IconBtn from '../IconBtn';
import ChatBarInput from './ChatBarInput';
import UploadFile from '../UploadFile';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';
import { setRoomExitTimestampOnDisconnect } from '../../logic/room_firebaseStuff';

import '../../styles/MentionsPopup.css';
import 'draft-js/dist/Draft.css';

const ChatBar = ({ replyTo, ...props }) => {
  const [files, setFiles] = useState();
  const [uploadProgress, setUploadProgress] = useState();
  let style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  function checkUploadProgess(e) {
    const percentLoaded = (e.loaded / e.total) * 100;
    setUploadProgress(percentLoaded);
  }
  return (
    <div className="chat-wrapper" style={style}>
      <div className="add-wrapper">
        <UploadFile>
          <div className="icon-btn">
            <img src={addCircleSvg} alt="upload a file" />
          </div>
        </UploadFile>
      </div>
      <ChatBarInput replyTo={replyTo} {...props} />
      {uploadProgress && <span>Uploading...{uploadProgress}%</span>}
    </div>
  );
};

export default ChatBar;
