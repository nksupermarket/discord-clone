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
  getRoomCategories,
  createRoomCategory,
  updateRoomCateogry,
  getRoomList,
  createRoom,
  getOnlineUsers,
  getUserRoles,
  getRoleOfUser,
  createUserRole,
  updateRoleOfUser,
  detachListenersForChannel,
} from './logic/channel_firebaseStuff';
import {
  detachListenersForRoom,
  getMsgList,
  pushToMsgList,
} from './logic/room_firebaseStuff';
import {
  createUser,
  signIn,
  getChannelList,
  updateUserOnline,
  detachListenersforUser,
} from './logic/user_firebaseStuff';

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
  const [roleList, setRoleList] = useState(['Online']);
  const [userRole, setUserRole] = useState();
  const [roomCategories, setRoomCategories] = useState(['none']);
  const [roomList, setRoomList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [room, setRoom] = useState({
    id: '-MkoRSx_sf_VYQYIXJWK',
    name: 'general',
  });
  const [msgList, setMsgList] = useState([]);

  const [error, setError] = useState();

  useEffect(() => {
    getMsgList(room.id, setMsgList, setError);
  }, [room.id]);

  useEffect(() => {
    if (!user) return;

    getChannelList(user.uid, setChannelList, setError);
  }, [user]);

  useEffect(() => {
    if (!channelList) return;

    updateUserOnline(user.uid, user.displayName, channelList, setError);
  }, [user, channelList]);

  useEffect(() => {
    if (!channel || !user) return;

    getOnlineUsers(channel.id, setUserList, setError);
    getUserRoles(channel.id, setRoleList, setError);
    getRoleOfUser(channel.id, user.uid, setUserRole, setError);
    getRoomCategories(channel.id, setRoomCategories, setError);
    getRoomList(channel.id, setRoomList, setError);
  }, [channel, user]);

  function submitMsg(msg) {
    const msgObj = {
      user: user.uid,
      displayName: user.displayName,
      msg,
      timestamp: getUnixTime(new Date()),
    };
    pushToMsgList(room.id, msgObj, setError);
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
            roomCategories={roomCategories}
            roomName={room.name}
            setRoom={setRoom}
            msgList={msgList}
            submitMsg={submitMsg}
            userList={userList}
            userRoles={roleList}
          />
        </div>
      </Router>
    </>
  );
}

export default App;
