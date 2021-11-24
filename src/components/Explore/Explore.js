import React, { useEffect } from 'react';

import Sidebar from '../Settings/Sidebar';
import UserInfo from '../UserInfo/UserInfo';

import '../../styles/Explore.css';
import BannerSearch from './BannerSearch';

const Explore = ({ finishLoading }) => {
  useEffect(() => finishLoading());
  return (
    <div className="explore-view">
      <nav className="sidebar">
        <header>
          <h2>Discover</h2>
        </header>
        <Sidebar
          btnList={[
            { text: 'Home' },
            { text: 'Gaming' },
            { text: 'Technology' },
          ]}
        />
        <UserInfo />
      </nav>
      <main>
        <header>
          <BannerSearch />
        </header>
        <div className="content"></div>
      </main>
    </div>
  );
};

export default Explore;
