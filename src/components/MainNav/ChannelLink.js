import React, { useState, useRef, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from '../Avatar';
import Tooltip from '../Tooltip';

const ChannelLink = ({ channelID, roomID, icon, name }) => {
  const linkRef = useRef();

  const [isTooltip, setIsTooltip] = useState(false);
  return (
    <>
      <NavLink
        ref={linkRef}
        to={(location) => ({
          ...location,
          pathname: `/channels/${channelID}/${roomID}`,
        })}
        activeClassName="selected"
        onMouseEnter={() => setIsTooltip(true)}
        onMouseLeave={() => setIsTooltip(false)}
      >
        <div className="avatar-wrapper list-item">
          <Avatar img={icon} channelName={name} />
        </div>
      </NavLink>
      {isTooltip && (
        <Tooltip
          text={name}
          posInfo={linkRef.current.getBoundingClientRect()}
        />
      )}
    </>
  );
};

export default ChannelLink;
