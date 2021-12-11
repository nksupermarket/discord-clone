import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { UserContext } from '../../logic/contexts/UserContext';
import { ChannelContext } from '../../logic/contexts/ChannelContext';
import { ErrorContext } from '../../logic/contexts/ErrorContext';
import useInputValues from '../../logic/custom-hooks/useInputValues';
import {
  createRoom,
  createRoomCategory,
} from '../../logic/channel_firebaseStuff';

import UserInfo from '../UserInfo/UserInfo_desktop';
import CatList from '../CatList';
import RoomLink from './RoomLink';
import Modal from '../Modal';
import Popup from '../Popup';
import RoomSettings from '../Settings/RoomSettings/RoomSettings';

import addSVG from '../../assets/svg/add-line.svg';

import '../../styles/ChannelNav.css';

const ChannelNav = ({ channel, categories, list }) => {
  categories = categories || [];

  const { mentioned } = useContext(UserContext);
  const { userRole, roomCategories } = useContext(ChannelContext);
  const { setError } = useContext(ErrorContext);

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
      newRoomInfo.room_category || null,
    );
    if (roomCategories.indexOf(newRoomInfo.room_category) === -1) {
      await createRoomCategory(channel.id, newRoomInfo.room_category);
    }
  }

  const [editRoomInfo, setEditRoomInfo] = useState();

  return (
    <>
      <nav className="channel-nav sidebar">
        <header>{channel.name}</header>
        <div className="room-list">
          {userRole === 'owner' && (
            <li className="room-link-item new_room-btn">
              <button
                className="content"
                onClick={() => setIsCreateRoom(true)}
              >
                <img src={addSVG} alt="plus icon" />
                <span>Add new room</span>
              </button>
            </li>
          )}
          {categories.map((category, i) => (
            <CatList
              key={i}
              cat={category}
              isHeader={category !== 'none'}
              className="category-room-wrapper"
            >
              {list
                .filter((room) => {
                  if (room.category === category) return true;
                  if (!room.category && category === 'none')
                    return true;
                  return false;
                })
                .map((room) => {
                  const hasMentions =
                    !!mentioned?.[channel.id]?.[room.id];
                  let mentionCount;
                  if (hasMentions)
                    mentionCount = Object.keys(
                      mentioned[channel.id][room.id],
                    ).length;
                  return (
                    <RoomLink
                      key={room.id}
                      channel={channel}
                      room={room}
                      mentionCount={mentionCount}
                      isAdmin={userRole === 'owner'}
                      editRoom={() => setEditRoomInfo(room)}
                    />
                  );
                })}
            </CatList>
          ))}
        </div>
        <UserInfo />
      </nav>
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
      {editRoomInfo && (
        <RoomSettings
          room={editRoomInfo}
          close={() => setEditRoomInfo()}
        />
      )}
    </>
  );
};

export default ChannelNav;

ChannelNav.propTypes = {
  channel: PropTypes.object,
  categories: PropTypes.array,
  list: PropTypes.array,
};
