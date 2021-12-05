import React, { useState, useMemo, useCallback } from 'react';

import Avatar from '../Avatar';
import MsgButtons from './MsgButtons';
import MentionWrapper from './MentionWrapper';
import AttachmentWrapper from '../Upload/AttachmentWrapper';

import '../../styles/ChatMsg.css';
import ReplyContext from './ReplyContext';
import MsgHeader from './MsgHeader';

const ChatMsg = ({ content, userList, onReplyTo }) => {
  const {
    user,
    msg,
    timestamp,
    msgId,
    mentions,
    attachments,
    replyTo: replyContext,
  } = content;

  const [isShowBtns, setIsShowBtns] = useState(false); //buttons on hover

  const sender = useMemo(
    () => userList.find((uObj) => uObj.uid === user),
    [userList, user]
  );

  const replyUser = useMemo(
    () => userList.find((uObj) => uObj.uid === replyContext?.user),
    [userList, replyContext]
  );

  const convertPlaintextToHTML = useCallback(
    (text, mentions) => {
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
          //marks beginning of mention
          content.push(
            <MentionWrapper
              key={mentionIndex}
              displayName={
                userList.find((u) => u.uid === mentions[mentionIndex].uid)
                  .displayName
              }
              uid={mentions[mentionIndex].uid}
            />
          );

        if (mentionRanges.includes(i)) return; // rest of the mention, can skip because mentionWrapper already inserted

        if (i === 0 || mentionRanges.includes(i - 1)) content.push(val); // marks beginning of non-mention string

        content[content.length - 1] = content[content.length - 1].concat(val); // string continues
      });

      return content;
    },
    [userList]
  );

  return (
    <li
      className="chat-msg"
      onMouseOver={() => setIsShowBtns(true)}
      onMouseLeave={() => setIsShowBtns(false)}
    >
      <div className="msg">
        {replyContext && (
          <ReplyContext
            displayName={replyUser.displayName}
            msg={convertPlaintextToHTML(
              replyContext.msg,
              replyContext.mentions
            )}
            avatar={replyUser.avatar}
            color={replyUser.color}
          />
        )}
        <div className="content">
          <Avatar img={sender.avatar} color={sender.color} />
          <MsgHeader displayName={sender.displayName} timestamp={timestamp} />
          <div className="msg-content">
            {convertPlaintextToHTML(msg, mentions)}
          </div>
          {attachments && (
            <div className="attachments-ctn">
              {attachments.map((a) => {
                return <AttachmentWrapper url={a.url} name={a.name} />;
              })}
            </div>
          )}
          {isShowBtns && (
            <MsgButtons
              msgId={msgId}
              setReplyTo={() => onReplyTo(sender.displayName, msgId)}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default ChatMsg;
