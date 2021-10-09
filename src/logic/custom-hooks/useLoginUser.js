import { useState, useEffect } from 'react';
import {
  getChannelList,
  updateUserOnline,
  detachListenersForUser,
} from '../user_firebaseStuff';

export default function useLoginUser(setError) {
  const [user, setUser] = useState();
  const [channelList, setChannelList] = useState([]);

  useEffect(
    function onLogin() {
      if (!user) return;
      getChannelList(user.uid, setChannelList, setError);

      return () => detachListenersForUser(user.uid);
    },
    [user, setError]
  );

  useEffect(
    function afterSetChannelList() {
      if (!user || !channelList) return;
      updateUserOnline(user.uid, user.displayName, channelList, setError);
    },
    [user, channelList, setError]
  );

  return { user, setUser, channelList };
}
