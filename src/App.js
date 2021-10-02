import React, { useState, useEffect } from 'react';

import fromUnixTime from 'date-fns/fromUnixTime';
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

function App() {
  const [user, setUser] = useState();
  const [channelList, setChannelList] = useState();
  const [channelId, setChannelId] = useState('-MkoRSxTqkrS9mlivGfs');
  const [roomList, setRoomList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [roomId, setRoomId] = useState('-MkoRSx_sf_VYQYIXJWK');
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    getMsgList(roomId, setMsgList);
  }, [roomId]);

  useEffect(() => {
    console.log(channelId);
    getOnlineUsers(channelId, setUserList);
  }, [channelId]);

  useEffect(() => {
    if (!user) return;

    fetchChannelList();
    async function fetchChannelList() {
      const list = await getChannelList(user.uid);
      setChannelList(list);
    }
  }, [user]);

  useEffect(() => {
    if (!channelId) return;

    getRoomList(channelId, setRoomList);
  }, [channelId]);

  function submitMsg(msg) {
    const msgObj = {
      user: user.uid,
      displayName: user.displayName,
      msg,
      timestamp: Date.now(),
    };
    pushToMsgList(roomId, msgObj);
  }

  return (
    <>
      {!user && (
        <LoginScreen
          createUser={(email, pw, displayName, setError) =>
            createUser(email, pw, displayName, channelId, setUser, setError)
          }
          signIn={(email, pw, setError) => signIn(email, pw, setUser, setError)}
          serverInfo={{ name: 'VIP Club', id: '-MkoRSxTqkrS9mlivGfs' }}
        />
      )}
      <div className="ctn">
        <ChannelList list={channelList} setChannelId={setChannelId} />
        <Content
          channelId={channelId}
          roomList={roomList}
          setRoomId={setRoomId}
          msgList={msgList}
          submitMsg={submitMsg}
          userList={userList}
        />
      </div>
    </>
  );
}

export default App;
