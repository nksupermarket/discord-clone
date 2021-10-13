import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import IconBtn from './IconBtn';
import Avatar from './Avatar';

import '../styles/ChannelList.css';

const ChannelList = ({ list, currentChannel, setChannel }) => {
  return (
    <nav id="main-nav">
      <header>
        <Link to="/" className="list-item">
          <IconBtn />
        </Link>
        <div className="header-underline-wrapper list-item">
          <div className="header-underline"></div>
        </div>
      </header>
      <div className="scroller">
        <ul className="channel-list">
          {list &&
            list.map((channel) => {
              if (currentChannel && currentChannel.id === channel.id)
                return (
                  <div className="avatar-wrapper list-item">
                    <Avatar selected={true} />
                  </div>
                );
              return (
                <Link to={`/channels/${channel.id}`}>
                  <div className="avatar-wrapper list-item">
                    <Avatar onClick={() => setChannel(channel)} />
                  </div>
                </Link>
              );
            })}
        </ul>
        <div className="btn-ctn">
          <div className="list-item">
            <IconBtn icon="flaticon-plus" isCircle={true} />
          </div>
          {/* add a server */}
          <div className="list-item">
            <IconBtn icon="flaticon-explore" isCircle={true} />
          </div>
        </div>

        {/* explore servers */}
      </div>
    </nav>
  );
};

export default ChannelList;
