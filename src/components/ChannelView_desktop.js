import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { UserContext } from '../logic/contexts/UserContext';

import ChannelNav from './ChannelNav/ChannelNav_desktop';
import OnlineUsers from './OnlineUsers/OnlineUsers';
import TopBar from './TopBar';
import ChatWrapper from './Chat/ChatWrapper';
import MainNav from './MainNav/MainNav_desktop';

import '../styles/ChannelView.css';

import useOnChannelEnter from '../logic/custom-hooks/useOnChannelEnter';
import useOnRoomEnter from '../logic/custom-hooks/useOnRoomEnter';

const ChannelView = ({ finishLoading, setError }) => {
  const { user, channelList } = useContext(UserContext);
  const { channelID, roomID } = useParams();
  const [channel, setChannel] = useState({ id: channelID });
  const [room, setRoom] = useState({ id: roomID });

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
    userRole,
  } = useOnChannelEnter(user, channelID, channelList, updateChannel, setError);

  // room stuff
  const updateRoom = useCallback(
    (name) => setRoom({ name, id: roomID }),
    [roomID]
  );
  const { msgList, submitMsg } = useOnRoomEnter(
    user,
    channelID,
    roomID,
    updateRoom,
    finishLoading,
    setError
  );

  return (
    <div className="channel-view">
      <MainNav />
      {channel && (
        <ChannelNav
          channel={channel}
          categories={roomCategories}
          list={roomList}
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
