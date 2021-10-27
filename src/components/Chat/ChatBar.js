import React, { useState, useEffect, useRef, useCallback } from 'react';

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

  useEffect(() => {
    if (!mentions || mentions.length === 0) return;

    const input = inputRef.current.innerHTML;

    const mentionUIDs = mentions.map((mention) => mention.uid);

    const uniqueMentions = mentionUIDs.filter(
      (uid, i, thisArr) => thisArr.indexOf(uid) === thisArr.lastIndexOf(uid)
    );

    let mentionCount = {};

    uniqueMentions.forEach((uid) => {
      let index = mentionUIDs.indexOf(uid);

      while (index !== -1) {
        mentionCount[uid] += 1;
        index = mentionUIDs.indexOf(uid, index + 1);
      }
    });

    let uidCountInMsg = {};

    for (const uid in uniqueMentions) {
      let index = input.indexOf(uid);
      while (index !== -1) {
        uidCountInMsg[uid] += 1;
        index = input.indexOf(uid, index + 1);
      }

      if (uidCountInMsg[uid] < mentionCount[uid]) {
        const mentionObj = mentions.find((obj) => obj.uid === uid);
        React.createPortal(
          <MentionWrapper displayName={mentionObj.displayName} uid={uid} />,
          inputRef.current
        );
      }
    }
  }, [msg, mentions]);

  let style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  return (
    <div className="chat-wrapper" style={style}>
      <div className="add-wrapper">
        <IconBtn svg={addCircleSvg} alt="upload a file" />
      </div>
      <div className="input-wrapper">
        {!msg && <div className="default-text">message {roomName}</div>}
        <div
          ref={inputRef}
          className="textarea"
          contentEditable
          onInput={(e) => setMsg(e.target.textContent)}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter': {
                console.log('hi');
                e.preventDefault();
                //submit message
                if (!msg) return;
                const replyToMsgID = replyTo ? replyTo.msgId : null;
                const mentionObj = mentions.length > 0 ? mentions : null;
                setReplyTo();
                submit(msg, replyToMsgID, mentionObj);
                e.target.textContent = '';
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
        >
          {mentions && (
            <MentionWrapper
              displayName={mentions[0].displayName}
              uid={mentions[0].uid}
            />
          )}
        </div>
        {/*<input
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
        />*/}
      </div>
      <div className="btn-ctn">
        <IconBtn icon="flaticon-gif" isRectangle={true} />
        <IconBtn icon="flaticon-happy" />
      </div>
    </div>
  );
};

export default ChatBar;
