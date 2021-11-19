import React from 'react';

import IconBtn from '../IconBtn';
import ChatBarInput from './ChatBarInput';
import UploadFile from '../UploadFile';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';
import { setRoomExitTimestampOnDisconnect } from '../../logic/room_firebaseStuff';

import '../../styles/MentionsPopup.css';
import 'draft-js/dist/Draft.css';

const ChatBar = ({ replyTo, ...props }) => {
  let style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

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
      <div className="btn-ctn">
        <IconBtn icon="flaticon-gif" isRectangle={true} />
        <IconBtn icon="flaticon-happy" />
      </div>
    </div>
  );
};

export default ChatBar;
