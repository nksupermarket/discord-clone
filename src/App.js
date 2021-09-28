import React, { useState } from 'react';

import fromUnixTime from 'date-fns/fromUnixTime';

import ChatBar from './components/ChatBar';
import ChatDisplay from './components/ChatDisplay';

import './globalStyles.css';
import UserList from './components/UserList';

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
  const [user, setUser] = useState('anon');
  const [msgList, setMsgList] = useState(msgListTest);

  function submitMsg(msg) {
    setMsgList((prev) => [
      ...prev,
      { user, msg, timestamp: fromUnixTime(Date.now()).toString() },
    ]);
  }

  return (
    <>
      <main>
        <ChatDisplay msgList={msgList} />
        <ChatBar submit={submitMsg} />
      </main>
      <UserList list={userList} />
    </>
  );
}

export default App;
