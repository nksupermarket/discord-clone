import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  Suspense,
} from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { getAuth, signOut } from '@firebase/auth';

import useError from './logic/custom-hooks/useError';
import useLoginUser from './logic/custom-hooks/useLoginUser';
import { UserContext } from './logic/contexts/UserContext';
import { ErrorContext } from './logic/contexts/ErrorContext';
import useMobileCheck from './logic/custom-hooks/useMobileCheck';
import Import from './logic/Import';

import LoginScreen from './components/Login/LoginScreen';
import Error from './components/Error';
import LoadingScreen from './components/LoadingScreen';
import MainNav from './components/MainNav/MainNav_desktop';

import './globalStyles.css';

//import icons
import './assets/font/flaticon.css';
import './assets/font/remixicon.css';

function App() {
  const { error, setError } = useError();
  const [loading, setLoading] = useState(true);

  const { user, setUser, channelList } = useLoginUser(setLoading, setError);

  const {
    isMobileCheck: { current: isMobile },
  } = useMobileCheck();

  const finishLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {error && <Error errorMsg={error} />}
      {loading && <LoadingScreen />}
      <ErrorContext.Provider value={{ setError }}>
        <Route path={['/login/:channelID', '/login']}>
          {!user && <LoginScreen setUser={setUser} isMobile={isMobile} />}
        </Route>
        {user && (
          <>
            <UserContext.Provider value={{ user, setUser, channelList }}>
              <div className="app">
                {!isMobile && <MainNav />}
                <Route path={'/explore'}>
                  <Import
                    mobile={() => import('./components/Explore/Explore_mobile')}
                    desktop={() =>
                      import('./components/Explore/Explore_desktop')
                    }
                    isMobile={isMobile}
                  >
                    {(Explore) => <Explore finishLoading={finishLoading} />}
                  </Import>
                </Route>
                <Route
                  path={[
                    '/channels/:channelID/:roomID',
                    '/channels/:channelID',
                  ]}
                >
                  <Import
                    mobile={() => import('./components/ChannelView_mobile')}
                    desktop={() => import('./components/ChannelView_desktop')}
                    isMobile={isMobile}
                  >
                    {(ChannelView) => (
                      <ChannelView
                        finishLoading={finishLoading}
                        setError={setError}
                      />
                    )}
                  </Import>
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
