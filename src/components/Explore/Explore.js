import React, { useState, useRef, useEffect } from 'react';

import Sidebar from '../Settings/Sidebar';
import UserInfo from '../UserInfo/UserInfo';
import ChannelCard from './ChannelCard';

import '../../styles/Explore.css';
import BannerSearch from './BannerSearch';
import { getPublicChannels } from '../../logic/channel_firebaseStuff';
import NavBtn from '../NavBtn';

import prevSVG from '../../assets/svg/arrow-left-s-line.svg';
import nextSVG from '../../assets/svg/arrow-right-s-line.svg';

const Explore = ({ finishLoading }) => {
  const [publicChannelList, setPublicChannelList] = useState([]);
  const firstChannelRef = useRef(null);

  useEffect(() => finishLoading());

  useEffect(() => {
    (async () => {
      const data = await getPublicChannels();
      setPublicChannelList(data);
      firstChannelRef.current = data[0].id;
    })();
  }, []);

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
        <div className="content">
          <div className="page-navigation">
            <div className="btn-ctn">
              <NavBtn
                icon={prevSVG}
                text={'Prev'}
                className="default_transition"
              />
              <NavBtn
                icon={nextSVG}
                text={'Next'}
                className="flex-reverse default_transition"
              />
            </div>
          </div>
          <div className="publicChannels-ctn">
            {publicChannelList.map((c) => (
              <ChannelCard channel={c} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;
