import React, { useState } from 'react';

import RoomList from './side bars/RoomList';
import ChatDisplay from './Chat/ChatDisplay';
import ChatBar from './Chat/ChatBar';
import UserList from './side bars/UserList';
import TopBar from './TopBar';

import '../styles/ChannelView.css';
import useOnChannelEnter from '../logic/custom-hooks/useOnChannelEnter';
import useOnRoomEnter from '../logic/custom-hooks/useOnRoomEnter';

const ChannelView = ({ user, channel, room, setRoom, setError }) => {
  const {
    roleList,
    roomCategories,
    roomList,
    onlineUsers,
    unreadRooms,
    userRole,
  } = useOnChannelEnter(user, channel, setError);

  const { msgList, submitMsg } = useOnRoomEnter(user, channel, room, setError);
  console.log(msgList);
  const [replyTo, setReplyTo] = useState();

  return (
    <div className="channel-view">
      <RoomList
        channel={channel}
        categories={roomCategories}
        list={roomList}
        unread={unreadRooms}
        setRoom={setRoom}
      />
      {room && (
        <div className="content">
          <TopBar room={room} />
          <div className="chat-ctn">
            <main id="chat">
              <ChatDisplay msgList={msgList} setReplyTo={setReplyTo} />
              <ChatBar
                submit={submitMsg}
                roomName={room.name}
                replyTo={replyTo}
                setReplyTo={setReplyTo}
              />
            </main>
            <UserList list={onlineUsers} roles={roleList} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelView;
