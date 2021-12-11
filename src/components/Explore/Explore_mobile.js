import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ErrorContext } from '../../logic/contexts/ErrorContext';
import {
  getPublicChannels,
  searchPublicChannels,
} from '../../logic/channel_firebaseStuff';
import useTouchEvents from '../../logic/custom-hooks/useTouchEvents';

import Sidebar from '../Settings/Sidebar';
import UserInfo from '../UserInfo/UserInfo_mobile';
import ChannelCard from './ChannelCard';
import NavBtn from '../NavBtn';
import BannerSearch from './BannerSearch';
import LoadingScreen from '../LoadingScreen';
import MainNav from '../MainNav/MainNav_mobile';
import MobileSidebar from '../MobileSidebar';
import CreateChannel from '../CreateChannel/CreateChannel';
import UserSettings from '../UserInfo/UserSettings_mobile';

import prevSVG from '../../assets/svg/arrow-left-s-line.svg';
import nextSVG from '../../assets/svg/arrow-right-s-line.svg';

import '../../styles/Explore.css';

const Explore = ({ finishLoading }) => {
  const { setError } = useContext(ErrorContext);
  const [publicChannelList, setPublicChannelList] = useState([]);
  const firstChannelID = useRef(null);
  const [query, setQuery] = useState();
  const searchedQuery = useRef();
  const [isSearch, setIsSearch] = useState(false);
  const scrollerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => finishLoading(), [finishLoading]);

  const getBatchOfChannels = useCallback(
    async (status, key) => {
      try {
        setLoading(true);
        const data = await getPublicChannels(status, key);
        if (data && status === 'init')
          firstChannelID.current = data[0].id;
        setPublicChannelList(data);
        setLoading(false);
        if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
      } catch (error) {
        setError(error.message);
      }
    },
    [setError],
  );
  useEffect(() => {
    getBatchOfChannels('init');
  }, [getBatchOfChannels, setError]);

  const searchChannels = useCallback(async () => {
    setLoading(true);
    try {
      if (!query) {
        setQuery('');
        setIsSearch(false);
        return await getBatchOfChannels('init');
      }
      const data = await searchPublicChannels(query);
      searchedQuery.current = query;
      setLoading(false);
      setIsSearch(true);
      setPublicChannelList(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [query, getBatchOfChannels, setError]);

  const showLeftSidebar = useCallback(() => {
    setShowSidebar(true);
  }, []);
  const hideLeftSidebar = useCallback(() => {
    setShowSidebar(false);
  }, []);
  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useTouchEvents(hideLeftSidebar, showLeftSidebar);

  const [isCreateChannel, setIsCreateChannel] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  return (
    <>
      {isCreateChannel && (
        <CreateChannel
          isMobile={true}
          close={() => setIsCreateChannel(false)}
        />
      )}
      {showUserSettings && (
        <UserSettings close={() => setShowUserSettings(false)} />
      )}
      <div
        className="explore-view mobile"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <MobileSidebar
          isLeft={true}
          className="nav-ctn mobile"
          hide={hideLeftSidebar}
          isVisible={showSidebar}
        >
          <MainNav
            beginCreateChannel={() => setIsCreateChannel(true)}
            isCreateChannel={isCreateChannel}
          />
          <nav className="sidebar view-sidebar">
            <header>
              <h2>Discover</h2>
            </header>
            <Sidebar
              btnList={[
                { text: 'Home', isDefault: true },
                { text: 'Gaming' },
                { text: 'Technology' },
              ]}
            />
            <UserInfo
              showSettings={() => setShowUserSettings(true)}
            />
          </nav>
        </MobileSidebar>
        <main>
          <header>
            <BannerSearch
              onSearch={searchChannels}
              handleChange={(e) => setQuery(e.target.value)}
              cancelSearch={() => {
                setIsSearch(false);
                setQuery('');
                getBatchOfChannels('init');
              }}
              query={query}
            />
          </header>
          <div className="content">
            {isSearch ? (
              <div className="text-wrapper">
                <h3>
                  Search results for: &#8220;{searchedQuery.current}
                  &#8221;
                </h3>
              </div>
            ) : (
              <div className="page-navigation">
                <div className="btn-ctn">
                  <NavBtn
                    icon={prevSVG}
                    text={'Prev'}
                    className={
                      !publicChannelList
                        ? 'default_transition inactive'
                        : publicChannelList.find(
                            (c) => c.id === firstChannelID.current,
                          )
                        ? 'default_transition inactive'
                        : 'default_transition'
                    }
                    onClick={() =>
                      getBatchOfChannels(
                        'prev',
                        publicChannelList[0].id,
                      )
                    }
                  />
                  <NavBtn
                    icon={nextSVG}
                    text={'Next'}
                    className={
                      !publicChannelList
                        ? 'flex-reverse default_transition inactive'
                        : publicChannelList.length % 20 !== 0 ||
                          publicChannelList.length === 0
                        ? 'flex-reverse default_transition inactive'
                        : 'flex-reverse default_transition'
                    }
                    onClick={() =>
                      getBatchOfChannels(
                        'next',
                        publicChannelList[
                          publicChannelList.length - 1
                        ].id,
                      )
                    }
                  />
                </div>
              </div>
            )}
            <div className="publicChannels-ctn">
              {loading ? (
                <LoadingScreen />
              ) : (
                <div className="scroller" ref={scrollerRef}>
                  <div className="scroller-content">
                    <ol>
                      {publicChannelList &&
                        publicChannelList.map((c) => (
                          <Link to={`/channels/${c.id}`} key={c.id}>
                            <ChannelCard channel={c} />
                          </Link>
                        ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Explore;

Explore.propTypes = {
  finishLoading: PropTypes.func,
};
