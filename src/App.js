import React, { useState, useEffect, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { getAuth, signOut } from '@firebase/auth';

import useLoginUser from './logic/custom-hooks/useLoginUser';
import { UserContext } from './logic/contexts/UserContext';

import ChannelView from './components/ChannelView';
import LoginScreen from './components/Login/LoginScreen';
import MainNav from './components/MainNav/MainNav';
import Error from './components/Error';

import './globalStyles.css';

//import icons
import './assets/font/flaticon.css';
import './assets/font/remixicon.css';

function App() {
  const [error, setError] = useState();
  const { user, setUser, channelList } = useLoginUser(setError);

  useEffect(function ifError() {
    if (error)
      setTimeout(() => {
        setError();
      }, 3500);
  });

  // useEffect(() => {
  //   if (!user) return;

  //   const auth = getAuth();
  //   signOut(auth);
  // }, [user]);

  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === '/')
      history.push('/channels/-MkoRSxTqkrS9mlivGfs');
  }, [history]);

  return (
    <>
      {error && <Error errorMsg={error} />}
      <Route path={['/login/:channelID', '/login']}>
        {!user && <LoginScreen setUser={setUser} setError={setError} />}
      </Route>
      {user && (
        <UserContext.Provider value={user}>
          <div className="app">
            <MainNav list={channelList} />
            <Route
              path={['/channels/:channelID/:roomID', '/channels/:channelID']}
            >
              <ChannelView setError={setError} />
            </Route>
          </div>
        </UserContext.Provider>
      )}
    </>
  );
}

export default App;
