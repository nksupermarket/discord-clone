import React, { useState, useEffect, useMemo, useContext } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from '@draft-js-plugins/mention';

import { ErrorContext } from '../../logic/contexts/ErrorContext';

import UserDisplay from '../OnlineUsers/UserDisplay';
import MentionsPopup from './MentionsPopup';
import MentionWrapper from './MentionWrapper';

const ChatBarInput = ({
  chatBarInputRef,
  roomName,
  userList,
  replyTo,
  setReplyTo,
  isAttachments,
  getAttachmentsURL,
  cleanUpAttachments,
  submit,
}) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [isMentionPopup, setIsMentionPopup] = useState(false);
  const [suggestions, setSuggestions] = useState(userList);
  const { setError } = useContext(ErrorContext);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent: MentionWrapper,
    });
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  function onChange(editorState) {
    setEditorState(editorState);
  }

  function onOpenChange(isOpen) {
    setIsMentionPopup(isOpen);
  }

  function onQueryChange({ value }) {
    setSuggestions(queryUserList(value));

    function queryUserList(query) {
      console.log(userList);
      return userList
        .sort((a, b) => {
          if (a.displayName === b.displayName) return 0;
          return a.displayName > b.displayName ? 1 : -1;
        })
        .filter((u) => u.displayName?.includes(query)) // bug in firebase where
        .filter((obj, i) => i < 5);
    }
  }

  function keyBindingFn(e) {
    switch (e.key) {
      case 'Enter':
        return 'msg-submit';
      default:
        return;
    }
  }

  function handleKeyCmd(cmd) {
    switch (cmd) {
      case 'msg-submit':
        onMsgSubmit();
        break;
      default:
        return;
    }

    async function onMsgSubmit() {
      const replyToMsgID = replyTo ? replyTo.msgID : null;

      const raw = convertToRaw(editorState.getCurrentContent());

      let mentionArr = [];
      fillMentionArr();
      function fillMentionArr() {
        for (const key in raw.entityMap) {
          mentionArr.push({
            uid: raw.entityMap[key].data.mention.uid,
          });
        }

        Object.keys(raw.blocks[0].entityRanges).forEach((key, i) => {
          mentionArr[i] = {
            ...mentionArr[i],
            range: raw.blocks[0].entityRanges[i],
            // the range of indexes the mention belongs in, need to parse later as the msg replaces all mentions with the string 'undefined'
          };
        });
      }

      const msg = raw.blocks[0].text;

      try {
        if (!isAttachments && !msg) return;
        let attachmentsURL;
        if (isAttachments) attachmentsURL = await getAttachmentsURL();
        await submit(msg, replyToMsgID, mentionArr, attachmentsURL);
        cleanUpAttachments();
        setReplyTo();

        //clear draftjs input
        const newEditorState = EditorState.push(
          editorState,
          ContentState.createFromText('')
        );
        const currentState = editorState.getSelection();
        const newEditorWithCurrentState = EditorState.forceSelection(
          newEditorState,
          currentState
        );
        setEditorState(newEditorWithCurrentState);
      } catch (error) {
        setError(error.message);
      }
    }
  }
  return (
    <div className="input-wrapper">
      <Editor
        ref={chatBarInputRef}
        editorKey={'editor'}
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCmd}
        placeholder={`message ${roomName}`}
      />
      <MentionSuggestions
        open={isMentionPopup}
        onOpenChange={onOpenChange}
        entryComponent={UserDisplay}
        popoverContainer={MentionsPopup}
        suggestions={suggestions}
        onSearchChange={onQueryChange}
        renderEmptyPopup={true}
      />
    </div>
  );
};

export default ChatBarInput;
