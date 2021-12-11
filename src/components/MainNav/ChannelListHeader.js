import React from 'react';
import PropTypes from 'prop-types';

import { useSpring, animated } from 'react-spring';

import Avatar from '../Avatar';

const ChannelListHeader = ({ visitingChannel }) => {
  const animate = useSpring({
    from: { transform: 'scale(0)' },
    to: [{ transform: 'scale(1.2)' }, { transform: 'scale(1)' }],
  });
  return (
    <header>
      <div className="list-item home-icon">
        <Avatar color="#cb3e5b" />
      </div>
      {visitingChannel && (
        <animated.div
          style={animate}
          className="list-item avatar-wrapper"
        >
          <Avatar
            channelName={visitingChannel.name}
            img={visitingChannel.icon}
          />
        </animated.div>
      )}
      <div className="header-underline-wrapper list-item">
        <div className="header-underline"></div>
      </div>
    </header>
  );
};

export default ChannelListHeader;

ChannelListHeader.propTypes = {
  visitingChannel: PropTypes.object,
};
