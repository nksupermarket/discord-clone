import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { getAuth, signOut } from '@firebase/auth';

import useError from './logic/custom-hooks/useError';
import useLoginUser from './logic/custom-hooks/useLoginUser';
import { UserContext } from './logic/contexts/UserContext';

import ChannelView from './components/ChannelView';
import LoginScreen from './components/Login/LoginScreen';
import MainNav from './components/MainNav/MainNav';
import Error from './components/Error';
import LoadingScreen from './components/LoadingScreen';

import './globalStyles.css';

//import icons
import './assets/font/flaticon.css';
import './assets/font/remixicon.css';
import { logout } from './logic/user_firebaseStuff';
import Explore from './components/Explore/Explore';

function App() {
  const { error, setError } = useError();
  const [loading, setLoading] = useState(true);

  const { user, setUser, channelList } = useLoginUser(setLoading, setError);

  return (
    <>
      {error && <Error errorMsg={error} />}
      {loading && <LoadingScreen />}
      <Route path={['/login/:channelID', '/login']}>
        {!user && <LoginScreen setUser={setUser} setError={setError} />}
      </Route>
      {user && (
        <>
          <UserContext.Provider value={{ user, setUser, channelList }}>
            <div className="app">
              <MainNav />
              <Route path={'/explore'}>
                <Explore
                  finishLoading={() => {
                    setLoading(false);
                  }}
                />
              </Route>
              <Route
                path={['/channels/:channelID/:roomID', '/channels/:channelID']}
              >
                <ChannelView
                  setError={setError}
                  finishLoading={() => {
                    setLoading(false);
                  }}
                />
              </Route>
            </div>
          </UserContext.Provider>
        </>
      )}
    </>
  );
}

export default App;
