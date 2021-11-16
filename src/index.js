import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserContext } from './logic/contexts/UserContext';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserContext.Provider value="">
        <App />
      </UserContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
