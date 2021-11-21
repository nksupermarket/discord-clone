import { useState, useEffect } from 'react';
import {
  getChannelList,
  updateUserOnline,
  detachListenersForUser,
  updateUserProfileColor,
  updateUserInfoForAllChannels,
  getUserInfo,
} from '../user_firebaseStuff';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useLoginUser(setError) {
  const [user, setUser] = useState();
  const [channelList, setChannelList] = useState();

  useEffect(
    function getCurrentUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (currUser) => {
        if (!currUser) return setUser(currUser);
        try {
          getUserInfo(
            currUser.uid,
            setChannelList,
            (val) => (currUser['color'] = val)
          );
        } catch (error) {
          setError(error);
        }
        setUser(currUser);
      });
    },
    [setUser, setError]
  );

  useEffect(
    function afterSetChannelList() {
      if (!user || !channelList) return;
      try {
        updateUserOnline(user.uid, channelList);
      } catch (error) {
        setError(error.message);
      }
    },
    [user, channelList, setError]
  );

  return { user, setUser, channelList };
}
