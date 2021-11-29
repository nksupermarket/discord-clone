import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { useHistory, useParams } from 'react-router';

import { UserContext } from '../logic/contexts/UserContext';
import useTouchEvents from '../logic/custom-hooks/useTouchEvents';
import useOnChannelEnter from '../logic/custom-hooks/useOnChannelEnter';
import useOnRoomEnter from '../logic/custom-hooks/useOnRoomEnter';
import { getRoomName } from '../logic/room_firebaseStuff';

import ChannelNav from './ChannelNav/ChannelNav_mobile';
import UserSettings from './UserInfo/UserSettings';
import MobileSidebar from './MobileSidebar';
import OnlineUsers from './OnlineUsers/OnlineUsers';
import TopBar from './TopBar';
import ChatWrapper from './Chat/ChatWrapper';
import MainNav from './MainNav/MainNav_mobile';

import '../styles/ChannelView.css';

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

  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const onLeftSwipe = useCallback(() => {
    if (!showLeftSidebar && !showRightSidebar) return setShowLeftSidebar(true);
    if (showRightSidebar) return setShowRightSidebar(false);
  }, [showLeftSidebar, showRightSidebar]);
  const onRightSwipe = useCallback(() => {
    if (showLeftSidebar) return setShowLeftSidebar(false);
    if (!showRightSidebar) return setShowRightSidebar(true);
  }, [showLeftSidebar, showRightSidebar]);
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchEvents(
    onRightSwipe,
    onLeftSwipe
  );

  const [showUserSettings, setShowUserSettings] = useState(false);
  useEffect(() => {
    console.log(showUserSettings);
  }, [showUserSettings]);
  return (
    <>
      {showUserSettings && (
        <UserSettings close={() => setShowUserSettings(false)} />
      )}
      {!showUserSettings && (
        <div
          className="channel-view"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {channel && showLeftSidebar && (
            <MobileSidebar isLeft={true} hide={() => setShowLeftSidebar(false)}>
              <MainNav />
              <ChannelNav
                channel={channel}
                categories={roomCategories}
                list={roomList}
                setRoom={setRoom}
                currentRoom={room}
                showUserSettings={() => {
                  console.log('im running');
                  setShowUserSettings(true);
                }}
              />
            </MobileSidebar>
          )}
          {room && (
            <>
              <div className="content">
                <TopBar room={room} />
                <div className="chat-ctn">
                  <ChatWrapper
                    room={room}
                    msgList={msgList}
                    userList={userList}
                    submitMsg={submitMsg}
                  />
                </div>
              </div>
              {showRightSidebar && (
                <MobileSidebar
                  isLeft={false}
                  hide={() => setShowRightSidebar(false)}
                >
                  <OnlineUsers list={onlineUsers} roles={roleList} />
                </MobileSidebar>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChannelView;
