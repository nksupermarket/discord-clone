import React, { useState, useEffect } from 'react';

import fromUnixTime from 'date-fns/fromUnixTime';
import {
  createUser,
  signIn,
  getMsgList,
  pushToMsgList,
  getOnlineUsers,
} from './firebaseStuff';

import ChatBar from './components/ChatBar';
import ChatDisplay from './components/ChatDisplay';

import './globalStyles.css';
import UserList from './components/UserList';
import LoginScreen from './components/LoginScreen';

function App() {
  const [user, setUser] = useState();
  const [channelId, setChannelId] = useState('-MkoRSxTqkrS9mlivGfs');
  const [roomList, setRoomList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [roomId, setRoomId] = useState('-MkoRSx_sf_VYQYIXJWK');
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    getMsgList(roomId, setMsgList);
    getOnlineUsers(channelId, setUserList);
  }, [roomId]);

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
      <main>
        <ChatDisplay msgList={msgList} />
        <ChatBar submit={submitMsg} />
      </main>
      <UserList list={userList} />
    </>
  );
}

export default App;
