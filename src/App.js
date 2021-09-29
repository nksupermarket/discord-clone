import React, { useState } from 'react';

import fromUnixTime from 'date-fns/fromUnixTime';
import { createUser, signIn } from './firebaseStuff';

import ChatBar from './components/ChatBar';
import ChatDisplay from './components/ChatDisplay';

import './globalStyles.css';
import UserList from './components/UserList';
import LoginScreen from './components/LoginScreen';

const msgListTest = [
  {
    user: 'creamfraiche',
    msg: 'fdjl;akdflkja;fjka;lfja;',
    timestamp: 'today',
  },
  {
    user: 'creamfraiche',
    msg: 'fdjl;akdflkja;fjka;lfja;',
    timestamp: 'today',
  },
  {
    user: 'creamfraiche',
    msg: 'fdjl;akdflkja;fjka;lfja;',
    timestamp: 'today',
  },
  {
    user: 'creamfraiche',
    msg: 'fdjl;akdflkja;fjka;lfja;',
    timestamp: 'today',
  },
];

const userList = [{ name: 'dfkl;ajflk;ad', img: '' }];

function App() {
  const [user, setUser] = useState();
  const [msgList, setMsgList] = useState(msgListTest);

  function submitMsg(msg) {
    setMsgList((prev) => [
      ...prev,
      { user, msg, timestamp: fromUnixTime(Date.now()).toString() },
    ]);
  }

  return (
    <>
      {!user && (
        <LoginScreen
          createUser={(email, pw, displayName, setError) =>
            createUser(email, pw, displayName, setUser, setError)
          }
          signIn={(email, pw, setError) => signIn(email, pw, setUser, setError)}
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
