import React from 'react';

import RoomList from './RoomList';
import ChatDisplay from './ChatDisplay';
import ChatBar from './ChatBar';
import UserList from './UserList';

import '../styles/Content.css';

const Content = ({
  channel,
  roomList,
  setRoom,
  msgList,
  roomName,
  submitMsg,
  userList,
}) => {
  return (
    <div className="content">
      {channel && (
        <RoomList channel={channel} list={roomList} setRoom={setRoom} />
      )}
      <main id="chat">
        <ChatDisplay msgList={msgList} />
        <ChatBar submit={submitMsg} roomName={roomName} />
      </main>
      <UserList list={userList} />
    </div>
  );
};

export default Content;
