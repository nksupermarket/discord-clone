import React from 'react';

import RoomList from './RoomList';
import ChatDisplay from './ChatDisplay';
import ChatBar from './ChatBar';
import UserList from './UserList';

import '../styles/ChannelView.css';
import useOnChannelEnter from '../logic/custom-hooks/useOnChannelEnter';
import useOnRoomEnter from '../logic/custom-hooks/useOnRoomEnter';

const ChannelView = ({ user, channel, room, setError }) => {
  const { roleList, roomCategories, roomList, onlineUsers, userRole } =
    useOnChannelEnter(user, channel, setError);

  const { msgList, submitMsg } = useOnRoomEnter(user, channel, room, setError);

  return (
    <div className="channel-view">
      {channel && (
        <RoomList
          channel={channel}
          categories={roomCategories}
          list={roomList}
        />
      )}
      <main id="chat">
        <ChatDisplay msgList={msgList} />
        <ChatBar submit={submitMsg} roomName={room.name} />
      </main>
      <UserList list={onlineUsers} roles={roleList} />
    </div>
  );
};

export default ChannelView;
