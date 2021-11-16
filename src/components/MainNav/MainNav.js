import React, { useState } from 'react';

import ChannelList from './ChannelList';

import '../../styles/MainNav.css';
import ChannelListHeader from './ChannelListHeader';
import MainNavBtn from './MainNavBtn';
import CreateChannel from '../CreateChannel/CreateChannel';

const MainNav = ({ list }) => {
  const [isCreateChannel, setIsCreateChannel] = useState(false);
  return (
    <>
      <nav id="main-nav">
        <ChannelListHeader />
        <div className="scroller">
          <ChannelList list={list} />
          <div className="btn-ctn">
            <MainNavBtn
              icon="flaticon-plus"
              onClick={() => setIsCreateChannel(true)}
            />
            {/* add a server */}
            <MainNavBtn icon="flaticon-explore" />
          </div>
          {/* explore servers */}
        </div>
      </nav>
      {isCreateChannel && (
        <CreateChannel close={() => setIsCreateChannel(false)} />
      )}
    </>
  );
};

export default MainNav;
