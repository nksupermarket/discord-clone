import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import MentionCounter from '../ChannelNav/MentionCounter';
import IconBtn from '../IconBtn';
import Tooltip from '../Tooltip';

import settingsSVG from '../../assets/svg/settings-3-fill.svg';

const RoomLink = ({
  channel,
  room,
  mentionCount,
  isAdmin,
  editRoom,
}) => {
  const [toolTipInfo, setToolTipInfo] = useState();
  const actionsRef = useRef({});
  return (
    <>
      <li className="room-link-item">
        <NavLink
          to={`/channels/${channel.id}/${room.id}`}
          className="content"
          activeClassName="active"
        >
          <span>{room.name}</span>
          {isAdmin && (
            <div className="actions">
              <IconBtn
                svg={settingsSVG}
                elRef={(el) => (actionsRef.current.settings = el)}
                onMouseEnter={() =>
                  setToolTipInfo({
                    text: 'Edit Room',
                    el: actionsRef.current.settings,
                  })
                }
                onMouseLeave={() => setToolTipInfo()}
                onClick={editRoom}
              />
            </div>
          )}
          {mentionCount && <MentionCounter count={mentionCount} />}
        </NavLink>
      </li>
      {toolTipInfo && (
        <Tooltip
          text={toolTipInfo.text}
          posInfo={toolTipInfo.el.getBoundingClientRect()}
          direction="top"
        />
      )}
    </>
  );
};

export default RoomLink;

RoomLink.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.string,
  }),
  room: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  mentionCount: PropTypes.number,
  isAdmin: PropTypes.bool,
  editRoom: PropTypes.func,
};
