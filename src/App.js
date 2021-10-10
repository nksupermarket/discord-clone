import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import { getChannelName } from './logic/channel_firebaseStuff';
import { getRoomName } from './logic/room_firebaseStuff';
import { createUser, signIn } from './logic/user_firebaseStuff';
import useLoginUser from './logic/custom-hooks/useLoginUser';
import parseUrl from './logic/parseUrl';

import ChannelView from './components/ChannelView';
import LoginScreen from './components/LoginScreen';
import ChannelList from './components/ChannelList';
import Error from './components/Error';

import './globalStyles.css';
//import icons
import './assets/font/flaticon.css';
import './assets/font/remixicon.css';

function App() {
  const location = useLocation();
  console.log(location);
  const [error, setError] = useState('Unable to load page');

  const { user, setUser, channelList } = useLoginUser(setError);
  const [channel, setChannel] = useState({
    name: 'VIP Club',
    id: '-MkoRSxTqkrS9mlivGfs',
  });
  const [room, setRoom] = useState({
    id: '-MkoRSx_sf_VYQYIXJWK',
    name: 'general',
  });

  useEffect(() => {
    if (error)
      setTimeout(() => {
        setError();
      }, 1500);
  });
  useEffect(() => {
    const url = window.location.pathname;
    if (url === '/')
      document.location.pathname =
        '/channels/-MkoRSxTqkrS9mlivGfs/-MkoRSxXwWWT4h6EuP3d';
    const channelId = parseUrl(url, 'channel');
    const roomId = parseUrl(url, 'room');
    getChannelName(channelId, setChannel, setError);
    getRoomName(roomId, setRoom, setError);
  }, []);

  return (
    <>
      <Router>
        {error && <Error errorMsg={error} />}
        {!user && (
          <LoginScreen
            createUser={(email, pw, displayName, setError) =>
              createUser(email, pw, displayName, channel.id, setUser, setError)
            }
            signIn={(email, pw, setError) =>
              signIn(email, pw, setUser, setError)
            }
            channel={channel}
          />
        )}
        <div className="ctn">
          {user && (
            <React.Fragment>
              <ChannelList list={channelList} currentChannel={channel} />
              <ChannelView user={user} channel={channel} room={room} />
            </React.Fragment>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
