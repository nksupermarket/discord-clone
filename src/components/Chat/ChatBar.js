import React, { useState, useEffect, useRef, useCallback } from 'react';

import IconBtn from '../IconBtn';
import MentionWrapper from './MentionWrapper';

import { getUsersForMentions } from '../../logic/channel_firebaseStuff';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';
import { setRoomExitTimestampOnDisconnect } from '../../logic/room_firebaseStuff';

const ChatBar = ({ roomName, replyTo, setReplyTo, submit }) => {
  const inputRef = useRef();
  const [msg, setMsg] = useState();

  const [isMentionPopup, setIsMentionPopup] = useState(false);

  function parseHTMLForMentions(html) {
    return html
      .split(' ')
      .filter((str) => str.includes('data-uid'))
      .map((dataAtt) => {
        const [, uid] = dataAtt.split('=');
        return uid;
      });
  }

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
        <span
          ref={inputRef}
          className="textarea"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => {
            setMsg(e.target.innerHTML);
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter': {
                e.preventDefault();
                //submit message
                if (!msg) return;
                const replyToMsgID = replyTo ? replyTo.msgId : null;
                const mentionArr = parseHTMLForMentions(msg);
                console.log(mentionArr);
                setReplyTo();
                //submit(msg, replyToMsgID, mentionArr);
                e.target.textContent = '';
                setMsg('');
                break;
              }
              case '@': {
                if (isMentionPopup) setIsMentionPopup(true);
                break;
              }
              case ' ': {
                setIsMentionPopup(false);
                break;
              }
              case 'Backspace' || 'Delete': {
                console.log(inputRef.current.innerHTML);
                break;
              }
              default:
                return;
            }
          }}
        >
          {mentions &&
            mentions.map((obj, i) => {
              return (
                <>
                  <MentionWrapper
                    key={i}
                    displayName={obj.displayName}
                    uid={obj.uid}
                    id={obj.id}
                  />
                  <span>&nbsp;</span>
                </>
              );
            })}
        </span>
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

function getCaretPosition(el) {
  let position = 0;

  const isSupported = typeof window.getSelection !== 'undefined';
  if (!isSupported) return;

  const selection = window.getSelection();
  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  console.log(range);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNode(el);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  position = preCaretRange.toString().length;

  return position;
}

function getCaretCoords() {
  let x = 0,
    y = 0;

  const isSupported = typeof window.getSelection !== 'undefined';
  if (!isSupported) return;

  const selection = window.getSelection();
  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(true);
  const rect = range.getClientRects()[0];
  if (rect) {
    x = rect.left;
    y = rect.top;
  }

  return { x, y };
}
