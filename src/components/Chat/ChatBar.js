import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { MentionsInput, Mention } from 'react-mentions';
import IconBtn from '../IconBtn';
import MentionWrapper from './MentionWrapper';
import MentionsPopup from './MentionsPopup';
import MentionsListItem from './MentionsListItem';

import { getUsersForMentions } from '../../logic/channel_firebaseStuff';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';
import { setRoomExitTimestampOnDisconnect } from '../../logic/room_firebaseStuff';

import '../../styles/MentionsPopup.css';

const ChatBar = ({ roomName, replyTo, setReplyTo, userList, submit }) => {
  const mentionsPopupRef = useRef();
  const inputRef = useRef();
  const [msg, setMsg] = useState();
  const [mentions, setMentions] = useState();
  const [isMentionPopup, setIsMentionPopup] = useState(false);

  useEffect(function centerChatTextarea() {
    const scrollHeight = inputRef.current.scrollHeight;
    //make sure input is right height
    inputRef.current.style.height = `${scrollHeight}px`;
  });
  let style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  function handleChange(e, newValue, newPlainTextValue, mentions) {
    setMsg(newValue);
    setMentions(mentions);
  }

  return (
    <div className="chat-wrapper" style={style}>
      <div className="add-wrapper">
        <IconBtn svg={addCircleSvg} alt="upload a file" />
      </div>
      <div className="input-wrapper">
        <MentionsPopup listRef={mentionsPopupRef} msg={msg} />

        <MentionsInput
          inputRef={inputRef}
          className="textarea"
          value={msg}
          onChange={handleChange}
          placeholder={`message ${roomName}`}
          suggestionsPortalHost={mentionsPopupRef.current}
        >
          <Mention
            className="mentions-popup"
            trigger="@"
            data={function queryUserList(query) {
              return userList
                .sort((a, b) => {
                  if (a.displayName === b.displayName) return 0;
                  return a.displayName > b.displayName ? 1 : -1;
                })
                .filter((obj) => obj.displayName.includes(query))
                .filter((obj, i) => i < 5)
                .map((obj) => ({ id: obj.uid, display: obj.displayName }));
            }}
            renderSuggestion={function showMentionSuggestions(entry) {
              return (
                <MentionsListItem
                  displayName={entry.display}
                  uid={entry.id}
                  avatar={entry.avatar}
                />
              );
            }}
            displayTransform={function displayMentionInInput(uid, display) {
              return <MentionWrapper uid={uid} displayName={display} />;
            }}
            onAdd={() => console.log('hi')}
          />
        </MentionsInput>
      </div>
      <div className="btn-ctn">
        <IconBtn icon="flaticon-gif" isRectangle={true} />
        <IconBtn icon="flaticon-happy" />
      </div>
    </div>
  );
};

export default ChatBar;

/*<span
          ref={inputRef}
          className="textarea"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => {
            getHTMLCaretIndex(e.target);

            setMsg(e.target.textContent);
            if (isMentionPopup) {
              console.log(e.target.innerHTML);
              //find end of mention
              let indexOfNextSpace = e.target.textContent.indexOf(
                ' ',
                mentionStart.current
              );
              //set query to @ to end of mention
              indexOfNextSpace === -1
                ? setQuery(e.target.textContent.slice(mentionStart.current + 1))
                : setQuery(
                    e.target.textContent.slice(
                      mentionStart.current + 1,
                      indexOfNextSpace
                    )
                  );
            }
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter': {
                e.preventDefault();
                //submit message
                if (!msg) return;
                const replyToMsgID = replyTo ? replyTo.msgId : null;
                const mentionArr = parseHTMLForMentions(e.target.innerHTML);
                setReplyTo();
                //submit(msg, replyToMsgID, mentionArr);
                e.target.textContent = '';
                setMsg('');
                break;
              }
              case '@': {
                if (!msg || msg.charAt(mentionStart.current - 1) === ' ') {
                  setIsMentionPopup(true);
                  mentionStart.current = getCaretIndex(inputRef.current);
                }
                break;
              }
              case ' ': {
                setIsMentionPopup(false);
                break;
              }
              case 'Delete':
              case 'Backspace': {
                console.log(msg);
                if (getCaretIndex(inputRef.current) === mentionStart.current)
                  setIsMentionPopup(false);
                break;
              }
              case 'Tab': {
                break;
              }
              default:
                return;
            }
          }}
        ></span>
        */

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

function parseHTMLForMentions(html) {
  return html
    .split(' ')
    .filter((str) => str.includes('data-uid'))
    .map((dataAtt) => {
      const [, uid] = dataAtt.split('=');
      return uid;
    });
}

function splitHTMLBySpan(el) {
  const clone = el.cloneNode(true);

  clone.querySelectorAll('span').forEach((span) => {
    clone.innerHTML = clone.innerHTML.replace(
      span.outerHTML,
      '⠀' + span.outerHTML + '⠀'
    ); // not empty space, special character U+2800
    console.log(clone.innerHTML);
  });

  const str = clone.innerHTML.split('⠀'); // not empty space, special character U+2800
  console.log(str);
}

function getCaretIndex(el) {
  let position = 0;

  const isSupported = typeof window.getSelection !== 'undefined';
  if (!isSupported) return;

  const selection = window.getSelection();
  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNode(el);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  position = preCaretRange.toString().length;

  return position;
}

function getHTMLCaretIndex(el) {
  let textPosition = getCaretIndex(el),
    htmlContent = el.innerHTML.replace('&nbsp;', ' '),
    textIndex = 0,
    htmlIndex = 0,
    insideHTML = false,
    htmlBegin = ['<span', '</span'],
    htmlEnd = '>';

  while (textIndex < textPosition) {
    const i = htmlIndex; //get around eslint no-loop-func error
    if (htmlBegin.some((tag) => htmlContent.indexOf(tag, i) === i))
      //check if character is html, if true iterate with htmlIndex until tag ends
      insideHTML = true;

    while (insideHTML) {
      if (htmlContent.indexOf(htmlEnd, htmlIndex) === htmlIndex) {
        insideHTML = false;
        break; //need to exit loop otherwise we increment htmlIndex twice
      }
      htmlIndex++;
    }

    htmlIndex++;
    if (!htmlBegin.some((tag) => htmlContent.indexOf(tag, i) === i))
      // check if character is html after incrementing eg. </span><span>
      textIndex++;
  }
  return htmlIndex;
}
