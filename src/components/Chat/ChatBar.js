import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  EditorState,
  ContentState,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from '@draft-js-plugins/mention';
import { stateToHTML } from 'draft-js-export-html';

import IconBtn from '../IconBtn';
import MentionWrapper from './MentionWrapper';
import MentionsPopup from './MentionsPopup';
import MentionsListItem from './MentionsListItem';

import { getUsersForMentions } from '../../logic/channel_firebaseStuff';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';
import { setRoomExitTimestampOnDisconnect } from '../../logic/room_firebaseStuff';

import '../../styles/MentionsPopup.css';
import 'draft-js/dist/Draft.css';
import UserDisplay from '../OnlineUsers/UserDisplay';

const ChatBar = ({ roomName, replyTo, setReplyTo, userList, submit }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [isMentionPopup, setIsMentionPopup] = useState(false);
  const [suggestions, setSuggestions] = useState(userList);

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

  const mentionsPopupRef = useRef();
  const [msg, setMsg] = useState();
  const [mentions, setMentions] = useState();

  const [activeSuggestion, setActiveSuggestion] = useState(0);

  let style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  function onChange(editorState) {
    setEditorState(editorState);
  }

  function onOpenChange(isOpen) {
    setIsMentionPopup(isOpen);
  }

  function onQueryChange({ value }) {
    setSuggestions(queryUserList(value));

    function queryUserList(query) {
      return userList
        .sort((a, b) => {
          if (a.displayName === b.displayName) return 0;
          return a.displayName > b.displayName ? 1 : -1;
        })
        .filter((obj) => obj.displayName.includes(query))
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

    function onMsgSubmit() {
      const replyToMsgID = replyTo ? replyTo.msgId : null;

      const raw = convertToRaw(editorState.getCurrentContent());

      let mentionArr = [];
      for (const key in raw.entityMap) {
        mentionArr.push({
          uid: raw.entityMap[key].data.mention.uid,
          displayName: raw.entityMap[key].data.mention.displayName,
        });
      }

      Object.keys(raw.blocks[0].entityRanges).forEach((key, i) => {
        mentionArr[i] = {
          ...mentionArr[i],
          range: raw.blocks[0].entityRanges[i],
        };
      });

      const msg = raw.blocks[0].text;

      const status = submit(msg, replyToMsgID, mentionArr);
      if (status === 'success') {
        setReplyTo();

        //clear draftjs input
        const newEditorState = EditorState.push(
          editorState,
          ContentState.createFromText('')
        );
        setEditorState(newEditorState);
      }
    }
  }

  return (
    <div className="chat-wrapper" style={style}>
      <div className="add-wrapper">
        <IconBtn svg={addCircleSvg} alt="upload a file" />
      </div>
      <div className="input-wrapper">
        <Editor
          editorKey={'editor'}
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCmd}
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
      <div className="btn-ctn">
        <IconBtn icon="flaticon-gif" isRectangle={true} />
        <IconBtn icon="flaticon-happy" />
      </div>
    </div>
  );
};

export default ChatBar;
