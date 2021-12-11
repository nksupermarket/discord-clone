import React, {
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import { UserContext } from '../../logic/contexts/UserContext';

import Avatar from '../Avatar';
import MsgButtons from './MsgButtons';
import MentionWrapper from './MentionWrapper';
import AttachmentWrapper from '../Upload/AttachmentWrapper';
import ReplyContext from './ReplyContext';
import MsgHeader from './MsgHeader';

import '../../styles/ChatMsg.css';

const ChatMsg = ({ content, userList, onReplyTo }) => {
  const {
    user: senderID,
    msg,
    timestamp,
    msgId,
    mentions,
    attachments,
    replyTo: replyContext,
  } = content;
  const [isShowBtns, setIsShowBtns] = useState(false); // buttons on hover
  const { user: currentUser } = useContext(UserContext);
  const isMentioned =
    mentions?.some((m) => m.uid === currentUser.uid) ||
    replyContext?.user;

  const sender = useMemo(
    () => userList.find((uObj) => uObj.uid === senderID),
    [userList, senderID],
  );
  const replyUser = useMemo(
    () => userList.find((uObj) => uObj.uid === replyContext?.user),
    [userList, replyContext],
  );

  const convertPlaintextToHTML = useCallback(
    (text, mentions) => {
      if (!mentions || mentions.length === 0) return text;
      const mentionRanges = []; // text indexes that contain a mention
      const mentionOffsets = []; // beginning index of each mention
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

      const content = [];
      text.split('').forEach((val, i) => {
        const mentionIndex = mentionOffsets.indexOf(i); // find which mention has offset i
        if (mentionIndex !== -1)
          // marks beginning of mention
          content.push(
            <MentionWrapper
              key={mentionIndex}
              displayName={
                userList.find(
                  (u) => u.uid === mentions[mentionIndex].uid,
                ).displayName
              }
              uid={mentions[mentionIndex].uid}
            />,
          );

        if (mentionRanges.includes(i)) return; // rest of the mention, can skip because mentionWrapper already inserted

        if (i === 0 || mentionRanges.includes(i - 1))
          return content.push(val); // marks beginning of non-mention string

        return (content[content.length - 1] =
          content[content.length - 1].concat(val)); // string continues
      });
      return content;
    },
    [userList],
  );
  return (
    <li
      className={isMentioned ? 'chat-msg mentioned' : 'chat-msg'}
      onMouseOver={() => setIsShowBtns(true)}
      onMouseLeave={() => setIsShowBtns(false)}
    >
      <div className="msg">
        {replyContext && (
          <ReplyContext
            displayName={replyUser.displayName}
            msg={convertPlaintextToHTML(
              replyContext.msg,
              replyContext.mentions,
            )}
            avatar={replyUser.avatar}
            color={replyUser.color}
          />
        )}
        <div className="content">
          <Avatar img={sender?.avatar} color={sender?.color} />
          <MsgHeader
            displayName={sender?.displayName}
            timestamp={timestamp}
          />
          <div className="msg-content">
            {convertPlaintextToHTML(msg, mentions)}
          </div>
          {attachments && (
            <div className="attachments-ctn">
              {attachments.map((a, idx) => {
                return (
                  <AttachmentWrapper
                    key={idx}
                    url={a.url}
                    name={a.name}
                  />
                );
              })}
            </div>
          )}
          {isShowBtns && (
            <MsgButtons
              msgId={msgId}
              setReplyTo={() => onReplyTo(sender?.displayName, msgId)}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default ChatMsg;

ChatMsg.propTypes = {
  content: PropTypes.object,
  userList: PropTypes.arrayOf(PropTypes.object),
  onReplyTo: PropTypes.func,
};
