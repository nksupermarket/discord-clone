import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { updateRoleOfUser } from './logic/channel_firebaseStuff';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

updateRoleOfUser('-MkoRSxTqkrS9mlivGfs', 'VLx4zHOAqsbaXMeG77ZHnn9gxNL2');

//createFirstChannel();
/*async function createFirstChannel() {
  const channel = await createChannel('VIP Club');
  createRoom(channel, 'announcements');
  createRoom(channel, 'general');
}
*/
