import React, { useContext } from 'react';

import { UserContext } from '../../logic/contexts/UserContext';
import { ChannelContext } from '../../logic/contexts/ChannelContext';

import UserInfo from '../UserInfo/UserInfo_mobile';
import CatList from '../CatList';
import RoomLink from './RoomLink';

import addSVG from '../../assets/svg/add-line.svg';

import '../../styles/ChannelNav.css';

const ChannelNav = ({
  channel,
  categories,
  list,
  showUserSettings,
  showCreateRoom,
}) => {
  categories = categories || [];

  const { mentioned } = useContext(UserContext);
  const { userRole } = useContext(ChannelContext);

  return (
    <>
      <nav className="channel-nav sidebar">
        <header>{channel.name}</header>
        <div className="room-list">
          {userRole === 'owner' && (
            <li className="room-link-item new_room-btn">
              <button className="content" onClick={showCreateRoom}>
                <img src={addSVG} alt="plus icon" />
                <span>Add new room</span>
              </button>
            </li>
          )}
          {categories.map((category, i) => (
            <CatList
              key={i}
              cat={category}
              isHeader={category === 'none' ? false : true}
              className="category-room-wrapper"
            >
              {list
                .filter((room) => {
                  if (room.category === category) return true;
                  if (!room.category && category === 'none') return true;
                  return false;
                })
                .map((room) => {
                  const hasMentions = !!mentioned?.[channel.id]?.[room.id];
                  let mentionCount;
                  if (hasMentions)
                    mentionCount = Object.keys(
                      mentioned[channel.id][room.id]
                    ).length;
                  return (
                    <RoomLink
                      key={room.id}
                      channel={channel}
                      room={room}
                      mentionCount={mentionCount}
                    />
                  );
                })}
            </CatList>
          ))}
        </div>
        <UserInfo showSettings={showUserSettings} />
      </nav>
    </>
  );
};

export default ChannelNav;
