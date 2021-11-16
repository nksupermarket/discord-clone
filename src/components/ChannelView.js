import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { useHistory, useParams } from 'react-router';

import { UserContext } from '../logic/contexts/UserContext';

import ChannelNav from './ChannelNav/ChannelNav';
import OnlineUsers from './OnlineUsers/OnlineUsers';
import TopBar from './TopBar';
import ChatWrapper from './Chat/ChatWrapper';

import '../styles/ChannelView.css';

import useOnChannelEnter from '../logic/custom-hooks/useOnChannelEnter';
import useOnRoomEnter from '../logic/custom-hooks/useOnRoomEnter';
import { getRoomName } from '../logic/room_firebaseStuff';

const ChannelView = ({ setError }) => {
  const user = useContext(UserContext);
  const { channelID, roomID } = useParams();
  const [channel, setChannel] = useState();
  const [room, setRoom] = useState();

  const updateChannel = useCallback(
    (name, icon) => setChannel({ name, icon, id: channelID }),
    [channelID]
  );
  const {
    roleList,
    roomCategories,
    roomList,
    userList,
    onlineUsers,
    unreadRooms,
    userRole,
  } = useOnChannelEnter(user, channelID, updateChannel, setError);

  // room stuff
  const history = useHistory();

  useEffect(() => {
    if (roomList.length === 0) return;

    if (!roomID && roomList[0])
      history.push(`/channels/${channel.id}/${roomList[0].id}`); //enter default room for channel
  }, [roomList, history, channel, roomID]);

  const updateRoom = useCallback(
    (name) => setRoom({ name, id: roomID }),
    [roomID]
  );
  const { msgList, submitMsg } = useOnRoomEnter(
    user,
    channelID,
    roomID,
    updateRoom,
    setError
  );

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
            <ChatWrapper
              room={room}
              msgList={msgList}
              userList={userList}
              submitMsg={submitMsg}
            />
            <OnlineUsers list={onlineUsers} roles={roleList} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelView;
