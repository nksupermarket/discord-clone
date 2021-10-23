import React, { useState, useEffect, useRef } from 'react';

import IconBtn from '../IconBtn';
import MentionWrapper from './MentionWrapper';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';
import { setRoomExitTimestampOnDisconnect } from '../../logic/room_firebaseStuff';

const ChatBar = ({
  roomName,
  replyTo,
  setReplyTo,
  submit,
  mention,
  setMention,
}) => {
  const [msg, setMsg] = useState();

  const inputRef = useRef();

  useEffect(() => {
    if (mention) {
      inputRef.current.focus();
      setMsg(' ');
    }
  }, [mention]);

  let style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  return (
    <div className="chat-wrapper" style={style}>
      <div className="add-wrapper">
        <IconBtn svg={addCircleSvg} alt="upload a file" />
      </div>
      <div className="input-wrapper">
        {mention && <MentionWrapper displayName={mention.displayName} />}
        <input
          ref={inputRef}
          type="text"
          name="chat"
          value={msg}
          placeholder={mention ? '' : `message #${roomName}`}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter': {
                //submit message
                const replyToMsgID = replyTo ? replyTo.msgId : null;
                const mentionObj = mention ? mention : null;
                setReplyTo();
                submit(e.target.value, replyToMsgID, mentionObj);
                e.target.value = '';
                setMsg('');
                setMention();
                break;
              }
              case 'Backspace' || 'Delete': {
                if (!e.target.value) setMention();
                break;
              }
              default:
                return;
            }
          }}
        />
      </div>
      <div className="btn-ctn">
        <IconBtn icon="flaticon-gif" isRectangle={true} />
        <IconBtn icon="flaticon-happy" />
      </div>
    </div>
  );
};

export default ChatBar;
