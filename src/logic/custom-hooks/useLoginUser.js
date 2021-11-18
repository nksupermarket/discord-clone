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
      try {
        getUserInfo(user.uid, setChannelList);
        //getUserProfileColor(user.uid);
      } catch (error) {
        setError(error.message);
      }
      return () => {
        detachListenersForUser(user.uid);
      };
    },
    [user, setError]
  );

  useEffect(
    function afterSetChannelList() {
      if (!user || !channelList) return;
      try {
        updateUserOnline(user.uid, channelList);
        // updateUserInfoForAllChannels(user.uid, channelList, {
        //   displayName: 'jax',
        // });

        // updateNewProfileColor();
      } catch (error) {
        setError(error.message);
      }
      async function updateNewProfileColor() {
        const profileColor = await updateUserProfileColor(user.uid);
        updateUserInfoForAllChannels(user.uid, channelList, {
          color: profileColor,
        });
      }
    },
    [user, channelList, setError]
  );

  return { user, setUser, channelList };
}
