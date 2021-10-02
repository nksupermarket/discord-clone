import React from 'react';
import { Link } from 'react-router-dom';

import IconBtn from './IconBtn';

import '../styles/ChannelList.css';

const ChannelList = ({ list, setChannelId }) => {
  return (
    <nav id="channel-list" className="sidebar">
      <header>
        <Link to="/">
          <IconBtn />
        </Link>
      </header>
      <div className="channel-list">
        {list &&
          list.map((channel) => (
            <Link to={`/channels/${channel.id}`}>
              <IconBtn
                className="channel-avatar"
                onClick={() => setChannelId(channel.id)}
              />
            </Link>
          ))}
      </div>
      <div className="btn-ctn">
        <IconBtn />
        {/* add a server */}
        <IconBtn /> {/* explore servers */}
      </div>
    </nav>
  );
};

export default ChannelList;
