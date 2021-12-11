import React, { useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { subscribeToChannel } from '../../logic/user_firebaseStuff';
import { UserContext } from '../../logic/contexts/UserContext';
import { ErrorContext } from '../../logic/contexts/ErrorContext';

import ChatDisplay from './ChatDisplay';
import ChatBarWrapper from './ChatBarWrapper';
import FlatBtn from '../FlatBtn';

const ChatWrapper = ({
  room,
  msgList,
  userList,
  submitMsg,
  isVisitor,
}) => {
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { channelID } = useParams();
  const [replyTo, setReplyTo] = useState();
  const chatBarInputRef = useRef();

  function onReplyTo(displayName, msgID) {
    setReplyTo({ displayName, msgID });
    chatBarInputRef.current.focus();
  }

  async function onSubscribe() {
    try {
      await subscribeToChannel(user, channelID);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main id="chat">
      <ChatDisplay
        roomID={room.id}
        msgList={msgList}
        userList={userList}
        setReplyTo={setReplyTo}
        onReplyTo={onReplyTo}
      />
      {!isVisitor ? (
        <ChatBarWrapper
          userList={userList}
          submit={submitMsg}
          roomName={room.name}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          chatBarInputRef={chatBarInputRef}
        />
      ) : (
        <div className="subscribe-banner">
          <FlatBtn
            className="filler"
            text="Subscribe"
            onClick={onSubscribe}
          />
          to this channel to chat
        </div>
      )}
    </main>
  );
};

export default ChatWrapper;

ChatWrapper.propTypes = {
  room: PropTypes.objectOf(PropTypes.string),
  msgList: PropTypes.arrayOf(PropTypes.object),
  userList: PropTypes.arrayOf(PropTypes.object),
  submitMsg: PropTypes.func,
  isVisitor: PropTypes.bool,
};
