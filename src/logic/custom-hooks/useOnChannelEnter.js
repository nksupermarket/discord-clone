import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getChannelInfo,
  detachListenersForChannel,
} from '../channel_firebaseStuff';

export default function useOnChannelEnter(
  user,
  channelID,
  updateChannel,
  setError
) {
  const [roleList, setRoleList] = useState(['Online']);
  const [roomCategories, setRoomCategories] = useState(['none']);
  const [roomList, setRoomList] = useState([]);
  const [roomsMentioned, setRoomsMentioned] = useState([]);
  const [userList, setUserList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userRole, setUserRole] = useState();

  const history = useHistory();
  useEffect(() => {
    if (!channelID || !user) return;
    onChannelEnter();
    async function onChannelEnter() {
      try {
        await getChannelInfo(
          channelID,
          updateChannel,
          setRoomCategories,
          setRoomList,
          setRoleList,
          setUserList,
          setOnlineUsers
        );
        //getRoleOfUser(channelID, user.uid, setUserRole, setError);
        //getMentions(user.uid, channelID, setRoomsMentioned, setError);
      } catch (error) {
        setError(error.message);
      }
    }

    return () => {
      detachListenersForChannel(channelID, user.uid);
    };
  }, [channelID, history, updateChannel, user, setError]);

  return {
    roleList,
    roomCategories,
    roomsMentioned,
    roomList,
    userList,
    onlineUsers,
    userRole,
  };
}
