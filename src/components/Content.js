import React from 'react';

import RoomList from './RoomList';
import ChatDisplay from './ChatDisplay';
import ChatBar from './ChatBar';
import UserList from './UserList';

import '../styles/Content.css';

const Content = ({
  channelId,
  roomList,
  setRoomId,
  msgList,
  submitMsg,
  userList,
}) => {
  return (
    <div className="content">
      {channelId && <RoomList list={roomList} setRoomId={setRoomId} />}
      <main id="chat">
        <ChatDisplay msgList={msgList} />
        <ChatBar submit={submitMsg} />
      </main>
      <UserList list={userList} />
    </div>
  );
};

export default Content;
