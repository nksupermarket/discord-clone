import React from 'react';
import { Link } from 'react-router-dom';

import IconBtn from './IconBtn';
import Avatar from './Avatar';

import '../styles/ChannelList.css';

const ChannelList = ({ list, currentChannel, setChannelId }) => {
  return (
    <nav id="channel-list" className="sidebar">
      <header>
        <Link to="/">
          <IconBtn />
        </Link>
      </header>
      <div className="scroller">
        <ul className="channel-list">
          {list &&
            list.map((channel) => {
              if (currentChannel.id === channel.id)
                return (
                  <div className="avatar-wrapper list-item">
                    <Avatar selected={true} />
                  </div>
                );
              return (
                <Link to={`/channels/${channel.id}`}>
                  <div className="avatar-wrapper list-item">
                    <Avatar onClick={() => setChannelId(channel.id)} />
                  </div>
                </Link>
              );
            })}
        </ul>
      </div>
      <div className="btn-ctn">
        <IconBtn icon="flaticon-plus" className={'list-item'} isCircle={true} />
        {/* add a server */}
        <IconBtn
          icon="flaticon-explore"
          className={'list-item'}
          isCircle={true}
        />{' '}
        {/* explore servers */}
      </div>
    </nav>
  );
};

export default ChannelList;
