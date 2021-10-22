import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import ChannelNav from './ChannelNav/ChannelNav';
import OnlineUsers from './OnlineUsers/OnlineUsers';
import TopBar from './TopBar';

import '../styles/ChannelView.css';

import useOnChannelEnter from '../logic/custom-hooks/useOnChannelEnter';
import useOnRoomEnter from '../logic/custom-hooks/useOnRoomEnter';
import { getChannelName } from '../logic/channel_firebaseStuff';
import { getRoomName } from '../logic/room_firebaseStuff';
import ChatWrapper from './Chat/ChatWrapper';

const ChannelView = ({ user, setError }) => {
  const { id, roomId } = useParams();
  const [channel, setChannel] = useState();
  const [room, setRoom] = useState();

  useEffect(() => {
    getChannelInfoThenSet();

    async function getChannelInfoThenSet() {
      const name = await getChannelName(id, setError);

      setChannel({
        name: name,
        id: id,
      });
    }
  }, [id, setError]);

  const {
    roleList,
    roomCategories,
    roomList,
    onlineUsers,
    unreadRooms,
    userRole,
  } = useOnChannelEnter(user, channel, setError);

  const history = useHistory();

  useEffect(() => {
    getRoomInfoThenSet();

    async function getRoomInfoThenSet() {
      const id = roomId || roomList[0].id;
      const name = await getRoomName(id, setError);

      setRoom({
        name: name,
        id: id,
      });
    }
  }, [roomList, history, id, roomId, setError]);

  const { msgList, submitMsg } = useOnRoomEnter(user, channel, room, setError);

  return (
    <div className="channel-view">
      {channel && (
        <ChannelNav
          channel={channel}
          categories={roomCategories}
          list={roomList}
          unread={unreadRooms}
          setRoom={setRoom}
          currentRoom={room}
        />
      )}
      {room && (
        <div className="content">
          <TopBar room={room} />
          <div className="chat-ctn">
            <ChatWrapper room={room} msgList={msgList} submitMsg={submitMsg} />
            <OnlineUsers list={onlineUsers} roles={roleList} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelView;
