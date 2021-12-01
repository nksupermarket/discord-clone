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
  // const [loading, setLoading] = useState(true);
  const {
    isMobileCheck: { current: isMobile },
  } = useMobileCheck();
  const { user, setUser, channelList } = useLoginUser(setLoading, setError);
  const [components, setComponents] = useState(async () => {
    return isMobile
      ? {
          Explore: await import('./components/Explore/Explore_mobile').then(
            (data) => console.log(data)
          ),
          ChannelView: await import('./components/ChannelView_mobile'),
        }
      : {
          Explore: await import('./components/Explore/Explore_desktop'),
          ChannelView: await import('./components/ChannelView_desktop'),
        };
  });
  console.log(components);

  // const finishLoading = useCallback(() => {
  //   setLoading(false);
  // }, []);

  useEffect(
    function loadAppropriateComponents() {
      setComponents(async () => {
        return isMobile
          ? {
              Explore: await import('./components/Explore/Explore_mobile'),
              ChannelView: await import('./components/ChannelView_mobile'),
            }
          : {
              Explore: await import('./components/Explore/Explore_desktop'),
              ChannelView: await import('./components/ChannelView_desktop'),
            };
      });
    },
    [isMobile]
  );

  const Explore = React.lazy(() => {
    return isMobile
      ? import('./components/Explore/Explore_mobile')
      : import('./components/Explore/Explore_desktop');
  });

  const ChannelView = React.lazy(() => {
    return isMobile
      ? import('./components/ChannelView_mobile')
      : import('./components/ChannelView_desktop');
  });

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
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
                    <Explore finishLoading={finishLoading} />
                  </Route>
                  <Route
                    path={[
                      '/channels/:channelID/:roomID',
                      '/channels/:channelID',
                    ]}
                  >
                    <ChannelView
                      finishLoading={finishLoading}
                      setError={setError}
                    />
                  </Route>
                </div>
              </UserContext.Provider>
            </>
          )}
        </ErrorContext.Provider>
      </Suspense>
    </>
  );
}

export default App;
