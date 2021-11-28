import React, { useState, useCallback, useRef, useEffect } from 'react';

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
  const firstChannelID = useRef(null);

  useEffect(() => finishLoading());

  useEffect(() => {
    (async () => {
      const data = await getPublicChannels();
      firstChannelID.current = data[0].id;
      setPublicChannelList(data);
    })();
  }, []);

  const getNextBatchOfChannels = useCallback(async () => {
    const data = await getPublicChannels(
      publicChannelList[publicChannelList.length - 1].id
    );
    setPublicChannelList(data);
  }, [publicChannelList]);

  const getPrevBatchOfChannels = useCallback(async () => {
    const data = await getPublicChannels('', publicChannelList[0].id);
    setPublicChannelList(data);
  }, [publicChannelList]);

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
                className={
                  publicChannelList.find((c) => c.id === firstChannelID.current)
                    ? 'default_transition inactive'
                    : 'default_transition'
                }
                onClick={getPrevBatchOfChannels}
              />
              <NavBtn
                icon={nextSVG}
                text={'Next'}
                className="flex-reverse default_transition"
                onClick={getNextBatchOfChannels}
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
