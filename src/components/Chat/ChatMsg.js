import React, { useState } from 'react';

import Avatar from '../Avatar';
import MsgButtons from './MsgButtons';
import MentionWrapper from './MentionWrapper';

import '../../styles/ChatMsg.css';
import ReplyContext from './ReplyContext';
import MsgHeader from './MsgHeader';

const ChatMsg = ({ content, setReplyTo }) => {
  const {
    displayName,
    msg,
    timestamp,
    msgId,
    mentions,
    replyTo: replyContext,
  } = content;

  const [isShowBtns, setIsShowBtns] = useState(false); //buttons on hover

  function replyToThisMsg() {
    setReplyTo({
      displayName,
      msgId,
    });
  }

  function convertPlaintextToHTML(text, mentions) {
    if (!mentions || mentions.length === 0) return text;

    let mentionRanges = []; // text indexes that contain a mention
    let mentionOffsets = []; //beginning index of each mention
    mentions.forEach((mention) => {
      mentionOffsets.push(mention.range.offset);
      for (
        let i = mention.range.offset;
        i < mention.range.offset + mention.range.length;
        i++
      ) {
        mentionRanges.push(i);
      }
    });

    let content = [];
    text.split('').forEach((val, i) => {
      const mentionIndex = mentionOffsets.indexOf(i); //find which mention has offset i
      if (mentionIndex !== -1)
        content.push(
          <MentionWrapper
            displayName={mentions[mentionIndex].displayName}
            uid={mentions[mentionIndex].uid}
          />
        );

      if (mentionRanges.includes(i)) return;

      if (i === 0 || mentionRanges.includes(i - 1)) content.push(val); // marks beginning of string

      content[content.length - 1] = content[content.length - 1].concat(val); // string continues
    });

    return content;
  }

  return (
    <li
      className="chat-msg"
      onMouseOver={() => setIsShowBtns(true)}
      onMouseLeave={() => setIsShowBtns(false)}
    >
      <div className="msg">
        {replyContext && (
          <ReplyContext
            displayName={replyContext.displayName}
            msg={convertPlaintextToHTML(
              replyContext.msg,
              replyContext.mentions
            )}
          />
        )}
        <div className="content">
          <Avatar />
          <MsgHeader displayName={displayName} timestamp={timestamp} />
          <div className="msg-content">
            {convertPlaintextToHTML(msg, mentions)}
          </div>
          {isShowBtns && (
            <MsgButtons msgId={msgId} setReplyTo={replyToThisMsg} />
          )}
        </div>
      </div>
    </li>
  );
};

export default ChatMsg;
