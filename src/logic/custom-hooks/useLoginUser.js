import { useState, useEffect } from 'react';
import {
  getChannelList,
  updateUserOnline,
  detachListenersForUser,
} from '../user_firebaseStuff';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useLoginUser(user, setUser, setError) {
  const [channelList, setChannelList] = useState([]);

  useEffect(
    function getCurrentUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (currUser) => {
        setUser(currUser);
      });
    },
    [setUser]
  );
  useEffect(
    function afterLogin() {
      if (!user) return;
      getChannelList(user.uid, setChannelList, setError);
      return () => {
        detachListenersForUser(user.uid);
      };
    },
    [user, setError]
  );

  useEffect(
    function afterSetChannelList() {
      if (!user || !channelList) return;
      updateUserOnline(user.uid, channelList, setError);
    },
    [user, channelList, setError]
  );

  return { user, setUser, channelList };
}
