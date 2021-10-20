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
  const [error, setError] = useState();

  const { user, setUser, channelList } = useLoginUser(setError);
  const [channel, setChannel] = useState();
  const [room, setRoom] = useState();

  useEffect(function ifError() {
    if (error)
      setTimeout(() => {
        setError();
      }, 1500);
  });

  useEffect(function getChannelAndRoomInfoFromUrl() {
    const url = window.location.pathname;
    if (url === '/')
      document.location.pathname =
        '/channels/-MkoRSxTqkrS9mlivGfs/-MkoRSxXwWWT4h6EuP3d';

    getChannelInfoThenSet();
    getRoomInfoThenSet();

    async function getChannelInfoThenSet() {
      const id = parseUrl(url, 'channel');
      const name = await getChannelName(id, setError);
      console.log(name);
      setChannel({
        name: name,
        id: id,
      });
    }
    async function getRoomInfoThenSet() {
      const id = parseUrl(url, 'room');
      const name = await getRoomName(id, setError);

      setRoom({
        name: name,
        id: id,
      });
    }
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
        <div className="app">
          <React.Fragment>
            {user && (
              <ChannelList
                list={channelList}
                currentChannel={channel}
                setChannel={setChannel}
              />
            )}
            {channel && (
              <ChannelView
                user={user}
                channel={channel}
                room={room}
                setRoom={setRoom}
              />
            )}
          </React.Fragment>
        </div>
      </Router>
    </>
  );
}

export default App;
