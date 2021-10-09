import React from 'react';

import RoomList from './RoomList';
import ChatDisplay from './ChatDisplay';
import ChatBar from './ChatBar';
import UserList from './UserList';

import '../styles/Content.css';

const Content = ({
  channel,
  roomList,
  roomCategories,
  setRoom,
  msgList,
  roomName,
  submitMsg,
  userList,
  userRoles,
  onRoomExit,
}) => {
  return (
    <div className="content-main">
      {channel && (
        <RoomList
          channel={channel}
          categories={roomCategories}
          list={roomList}
          setRoom={setRoom}
          onRoomExit={onRoomExit}
        />
      )}
      <main id="chat">
        <ChatDisplay msgList={msgList} />
        <ChatBar submit={submitMsg} roomName={roomName} />
      </main>
      <UserList list={userList} roles={userRoles} />
    </div>
  );
};

export default Content;
