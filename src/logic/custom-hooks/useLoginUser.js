import { useState, useEffect } from 'react';
import { updateUserOnline, getUserInfo } from '../user_firebaseStuff';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory, useLocation } from 'react-router-dom';

export default function useLoginUser(setLoading, setError) {
  const [user, setUser] = useState();
  const [channelList, setChannelList] = useState();

  const location = useLocation();
  const history = useHistory();

  useEffect(
    function getCurrentUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (currUser) => {
        if (!currUser) {
          //on logout stuff
          setUser(currUser);
          setChannelList();
          setLoading(false);
          history.replace('/login');
          return;
        }

        if (currUser) {
          try {
            await getUserInfo(
              currUser.uid,
              setChannelList,
              (val) => (currUser['color'] = val)
            );
            setUser(currUser);
          } catch (error) {
            setError(error.message);
          }
        }
      });
    },
    [history, location.pathname, setLoading, setUser, setError]
  );

  useEffect(
    function afterSetChannelList() {
      if (!user || !channelList) return;
      if (location.pathname === '/' || location.pathname === '/login')
        if (channelList[0]) {
          const defaultRoomID = Object.keys(channelList[0].defaultRoom)[0];
          history.replace(`channels/${channelList[0].id}/${defaultRoomID}`);
        } else {
          history.replace('explore');
        }

      try {
        updateUserOnline(user.uid, channelList);
      } catch (error) {
        setError(error.message);
      }
    },
    [user, channelList, history, location.pathname, setError]
  );

  return { user, setUser, channelList };
}
