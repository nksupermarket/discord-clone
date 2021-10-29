import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router';

import ChannelNav from './ChannelNav/ChannelNav';
import OnlineUsers from './OnlineUsers/OnlineUsers';
import TopBar from './TopBar';
import ChatWrapper from './Chat/ChatWrapper';

import '../styles/ChannelView.css';

import useOnChannelEnter from '../logic/custom-hooks/useOnChannelEnter';
import useOnRoomEnter from '../logic/custom-hooks/useOnRoomEnter';
import { getChannelName } from '../logic/channel_firebaseStuff';
import { getRoomName } from '../logic/room_firebaseStuff';

const ChannelView = ({ user, setError }) => {
  const { channelId, roomId } = useParams();
  const [channel, setChannel] = useState();
  const [room, setRoom] = useState();

  useEffect(() => {
    getChannelInfoThenSetChannel();

    async function getChannelInfoThenSetChannel() {
      const name = await getChannelName(channelId, setError);

      setChannel({
        name: name,
        id: channelId,
      });
    }
  }, [channelId, setError]);

  const {
    roleList,
    roomCategories,
    roomList,
    onlineUsers,
    unreadRooms,
    userRole,
  } = useOnChannelEnter(user, channel, setError);

  // room stuff
  const history = useHistory();

  useEffect(() => {
    if (roomList.length === 0) return;

    if (!roomId && roomList[0])
      history.push(`/channels/${channel.id}/${roomList[0].id}`); //enter default room for channel

    getRoomInfoThenSetRoom();

    async function getRoomInfoThenSetRoom() {
      const id = roomId || roomList[0].id;
      const name = await getRoomName(id, setError);

      setRoom({
        name: name,
        id: id,
      });
    }
  }, [roomList, history, channel, roomId, setError]);

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
