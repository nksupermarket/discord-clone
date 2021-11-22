import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Route, useHistory } from 'react-router-dom';
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

function App() {
  const { error, setError } = useError();
  const { user, setUser, channelList } = useLoginUser(setError);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!user) return;

  //   const auth = getAuth();
  //   signOut(auth);
  // }, [user]);

  const history = useHistory();
  const onFirstMount = useCallback(() => {
    if (!channelList) return;

    if (channelList[0]) history.push(`/channels/${channelList[0].id}/`); //enter default room for channel
  }, [channelList, history]);
  useEffect(onFirstMount, [onFirstMount]);

  return (
    <>
      {error && <Error errorMsg={error} />}
      <Route path={['/login/:channelID', '/login']}>
        {!user && <LoginScreen setUser={setUser} setError={setError} />}
      </Route>
      {user && (
        <>
          {loading && <LoadingScreen />}
          <UserContext.Provider value={{ user, setUser, channelList }}>
            <div className="app">
              <MainNav />
              <Route
                path={['/channels/:channelID/:roomID', '/channels/:channelID']}
              >
                <ChannelView
                  setError={setError}
                  finishLoading={() => setLoading(false)}
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
