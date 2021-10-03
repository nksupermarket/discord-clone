import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

import getUnixTime from 'date-fns/getUnixTime';
import {
  createUser,
  signIn,
  getMsgList,
  pushToMsgList,
  getOnlineUsers,
  getChannelList,
  getRoomList,
} from './firebaseStuff';

import Content from './components/Content';
import LoginScreen from './components/LoginScreen';
import ChannelList from './components/ChannelList';

import './globalStyles.css';
//import icons
import './assets/font/flaticon.css';

function App() {
  const [user, setUser] = useState();
  const [channelList, setChannelList] = useState();
  const [channel, setChannel] = useState({
    name: 'VIP Club',
    id: '-MkoRSxTqkrS9mlivGfs',
  });
  const [roomList, setRoomList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [room, setRoom] = useState({
    id: '-MkoRSx_sf_VYQYIXJWK',
    name: 'general',
  });
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    getMsgList(room.id, setMsgList);
  }, [room.id]);

  useEffect(() => {
    getOnlineUsers(channel.id, setUserList);
  }, [channel]);

  useEffect(() => {
    if (!user) return;

    updateChannelList();
    async function updateChannelList() {
      const list = await getChannelList(user.uid);
      setChannelList(list);
    }
  }, [user]);

  useEffect(() => {
    if (!channel) return;

    getRoomList(channel.id, setRoomList);
  }, [channel]);

  function submitMsg(msg) {
    const msgObj = {
      user: user.uid,
      displayName: user.displayName,
      msg,
      timestamp: getUnixTime(new Date()),
    };
    pushToMsgList(room.id, msgObj);
  }

  return (
    <>
      <Router>
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
          <ChannelList
            list={channelList}
            currentChannel={channel}
            setChannel={setChannel}
          />
          <Content
            channel={channel}
            roomList={roomList}
            roomName={room.name}
            setRoom={setRoom}
            msgList={msgList}
            submitMsg={submitMsg}
            userList={userList}
          />
        </div>
      </Router>
    </>
  );
}

export default App;
