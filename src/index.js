import React from 'react';
import ReactDOM from 'react-dom';

import { createChannel, createRoom } from './firebaseStuff';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//createFirstChannel();
async function createFirstChannel() {
  const channel = await createChannel('VIP Club');
  createRoom(channel, 'announcements');
  createRoom(channel, 'general');
}
