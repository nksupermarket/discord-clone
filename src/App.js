import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { getAuth, signOut } from '@firebase/auth';

import useError from './logic/custom-hooks/useError';
import useLoginUser from './logic/custom-hooks/useLoginUser';
import { UserContext } from './logic/contexts/UserContext';
import { ErrorContext } from './logic/contexts/ErrorContext';

import ChannelView from './components/ChannelView';
import LoginScreen from './components/Login/LoginScreen';
import MainNav from './components/MainNav/MainNav';
import Error from './components/Error';
import LoadingScreen from './components/LoadingScreen';

import './globalStyles.css';

//import icons
import './assets/font/flaticon.css';
import './assets/font/remixicon.css';
import Explore from './components/Explore/Explore';

function App() {
  const { error, setError } = useError();
  const [loading, setLoading] = useState(true);

  const { user, setUser, channelList } = useLoginUser(setLoading, setError);

  const finishLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {error && <Error errorMsg={error} />}
      {loading && <LoadingScreen />}
      <ErrorContext.Provider value={{ setError }}>
        <Route path={['/login/:channelID', '/login']}>
          {!user && <LoginScreen setUser={setUser} />}
        </Route>
        {user && (
          <>
            <UserContext.Provider value={{ user, setUser, channelList }}>
              <div className="app">
                <MainNav />
                <Route path={'/explore'}>
                  <Explore finishLoading={finishLoading} />
                </Route>
                <Route
                  path={[
                    '/channels/:channelID/:roomID',
                    '/channels/:channelID',
                  ]}
                >
                  <ChannelView finishLoading={finishLoading} />
                </Route>
              </div>
            </UserContext.Provider>
          </>
        )}
      </ErrorContext.Provider>
    </>
  );
}

export default App;
