import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import MentionCounter from '../ChannelNav/MentionCounter';
import IconBtn from '../IconBtn';
import Tooltip from '../Tooltip';

import settingsSVG from '../../assets/svg/settings-3-fill.svg';

const RoomLink = ({ channel, room, mentionCount, isAdmin }) => {
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
