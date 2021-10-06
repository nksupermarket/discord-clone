import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {
  createRoomCategory,
  createUserRole,
  updateCategoryOfRoom,
  updateRoleOfUser,
} from './logic/channel_firebaseStuff';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
