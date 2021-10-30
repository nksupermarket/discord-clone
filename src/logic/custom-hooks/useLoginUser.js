import { useState, useEffect } from 'react';
import {
  getChannelList,
  updateUserOnline,
  detachListenersForUser,
} from '../user_firebaseStuff';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useLoginUser(setError) {
  const [user, setUser] = useState();
  const [channelList, setChannelList] = useState([]);
  useEffect(function getCurrentUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(
    function onLogin() {
      if (!user) return;
      getChannelList(user.uid, setChannelList, setError);
    },
    [user, setError]
  );

  useEffect(
    function afterSetChannelList() {
      if (!user || !channelList) return;
      updateUserOnline(user.uid, channelList, setError);

      return () => detachListenersForUser(user.uid);
    },
    [user, channelList, setError]
  );

  return { user, setUser, channelList };
}
