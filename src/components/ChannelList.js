import React from 'react';
import IconBtn from './IconBtn';

import '../styles/ChannelList.css';

const ChannelList = ({ list, setChannelId }) => {
  return (
    <nav id="channel-list" className="sidebar">
      <header>
        <IconBtn />
      </header>
      <div className="channel-list">
        {list &&
          list.map((channel) => (
            <IconBtn
              className="channel-avatar"
              onClick={() => setChannelId(channel.id)}
            />
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
