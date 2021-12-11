import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import MentionCounter from '../ChannelNav/MentionCounter';
import Tooltip from '../Tooltip';

const ChannelLink = ({ channelID, mentionCount, icon, name }) => {
  const linkRef = useRef();

  const animate = useSpring({
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
  });

  const [isTooltip, setIsTooltip] = useState(false);
  return (
    <>
      <animated.div style={animate}>
        <NavLink
          ref={linkRef}
          to={(location) => ({
            ...location,
            pathname: `/channels/${channelID}/`,
          })}
          activeClassName="selected"
          onMouseEnter={() => setIsTooltip(true)}
          onMouseLeave={() => setIsTooltip(false)}
        >
          <div className="avatar-wrapper list-item">
            <Avatar img={icon} channelName={name} />
          </div>
          {mentionCount > 0 && (
            <MentionCounter count={mentionCount} />
          )}
        </NavLink>
      </animated.div>
      {isTooltip && (
        <Tooltip
          text={name}
          posInfo={linkRef.current.getBoundingClientRect()}
          direction={'right'}
        />
      )}
    </>
  );
};

export default ChannelLink;

ChannelLink.propTypes = {
  channelID: PropTypes.string,
  mentionCount: PropTypes.number,
  icon: PropTypes.string,
  name: PropTypes.string,
};
