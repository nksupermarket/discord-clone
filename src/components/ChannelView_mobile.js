import React, { useState, useCallback, useContext } from 'react';
import { useParams } from 'react-router';

import { UserContext } from '../logic/contexts/UserContext';
import useTouchEvents from '../logic/custom-hooks/useTouchEvents';
import useOnChannelEnter from '../logic/custom-hooks/useOnChannelEnter';
import useOnRoomEnter from '../logic/custom-hooks/useOnRoomEnter';
import { ChannelContext } from '../logic/contexts/ChannelContext';
import useInputValues from '../logic/custom-hooks/useInputValues';
import { createRoom, createRoomCategory } from '../logic/channel_firebaseStuff';

import ChannelNav from './ChannelNav/ChannelNav_mobile';
import UserSettings from './UserInfo/UserSettings_mobile';
import MobileSidebar from './MobileSidebar';
import OnlineUsers from './OnlineUsers/OnlineUsers';
import TopBar from './TopBar';
import ChatWrapper from './Chat/ChatWrapper';
import MainNav from './MainNav/MainNav_mobile';
import CreateChannel from './CreateChannel/CreateChannel';
import Modal from './Modal';
import Popup from './Popup';
import RoomSettings from './Settings/RoomSettings/RoomSettings';

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
    visitingChannel,
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
  const [isCreateChannel, setIsCreateChannel] = useState(false);

  const [isCreateRoom, setIsCreateRoom] = useState(false);
  const {
    inputValues: newRoomInfo,
    handleChange,
    resetInputValues,
  } = useInputValues();

  async function onCreateRoom() {
    await createRoom(
      channel.id,
      newRoomInfo.room_name,
      newRoomInfo.room_category || null
    );
    if (roomCategories.indexOf(newRoomInfo.room_category) === -1) {
      await createRoomCategory(channel.id, newRoomInfo.room_category);
    }
  }

  const [editRoomInfo, setEditRoomInfo] = useState();

  return (
    <ChannelContext.Provider value={{ userRole }}>
      {editRoomInfo && (
        <RoomSettings room={editRoomInfo} close={() => setEditRoomInfo()} />
      )}
      {isCreateRoom && (
        <Modal
          close={() => {
            setIsCreateRoom(false);
            resetInputValues();
          }}
        >
          <Popup
            close={() => {
              setIsCreateRoom(false);
              resetInputValues();
            }}
            handleChange={handleChange}
            className="settings-popup"
            title="Create a new room"
            fields={[
              { label: 'Room Name', name: 'room_name', type: 'text' },
              {
                label: 'Room Category',
                name: 'room_category',
                type: 'text',
              },
            ]}
            submitAction={onCreateRoom}
            setError={setError}
            inputValues={newRoomInfo}
          ></Popup>
        </Modal>
      )}
      {isCreateChannel && (
        <CreateChannel
          isMobile={true}
          close={() => setIsCreateChannel(false)}
        />
      )}
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
              <MainNav
                visitingChannel={visitingChannel}
                beginCreateChannel={() => setIsCreateChannel(true)}
                isCreateChannel={isCreateChannel}
              />
              <ChannelNav
                channel={channel}
                categories={roomCategories}
                list={roomList}
                setRoom={setRoom}
                currentRoom={room}
                showUserSettings={() => {
                  setShowUserSettings(true);
                }}
                showCreateRoom={() => {
                  setIsCreateRoom(true);
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
                    isVisitor={!!visitingChannel}
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
    </ChannelContext.Provider>
  );
};

export default ChannelView;
