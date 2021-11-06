import React from 'react';

import ChannelList from './ChannelList';

import '../../styles/MainNav.css';
import ChannelListHeader from './ChannelListHeader';
import MainNavBtn from './MainNavBtn';
import CreateChannel from '../CreateChannel/CreateChannel';

const MainNav = ({ list, openModal }) => {
  return (
    <nav id="main-nav">
      <ChannelListHeader />
      <div className="scroller">
        <ChannelList list={list} />
        <div className="btn-ctn">
          <MainNavBtn
            icon="flaticon-plus"
            onClick={function openCreateChannel() {
              openModal(<CreateChannel />);
            }}
          />
          {/* add a server */}
          <MainNavBtn icon="flaticon-explore" />
        </div>
        {/* explore servers */}
      </div>
    </nav>
  );
};

export default MainNav;
