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
  mentions,
  setMentions,
}) => {
  const [msg, setMsg] = useState();

  const inputRef = useRef();

  useEffect(() => console.log(msg));

  useEffect(() => {
    if (mentions) {
      //setMsg((prev) => prev + `@${mention.displayName}`);
    }
  }, [mentions]);

  let style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  return (
    <div className="chat-wrapper" style={style}>
      <div className="add-wrapper">
        <IconBtn svg={addCircleSvg} alt="upload a file" />
      </div>
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          name="chat"
          value={msg}
          placeholder={`message #${roomName}`}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter': {
                //submit message
                if (!msg) return;
                const replyToMsgID = replyTo ? replyTo.msgId : null;
                const mentionObj = mentions ? mentions : null;
                setReplyTo();
                submit(msg, replyToMsgID, mentionObj);
                setMsg('');
                if (mentions) setMentions();
                break;
              }
              case 'Backspace' || 'Delete': {
                if (!mentions) return;
                const mentionsThatExistInMsg = mentions
                  .map((mention) => {
                    if (msg.includes(`@${mention.displayName}`)) return mention;
                    return null;
                  })
                  .filter((val) => val);

                setMentions(mentionsThatExistInMsg);
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
