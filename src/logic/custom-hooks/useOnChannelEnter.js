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
  finishLoading,
  setError
) {
  const [roleList, setRoleList] = useState(['Online']);
  const [roomCategories, setRoomCategories] = useState(['none']);
  const [roomList, setRoomList] = useState([]);
  const [roomsMentioned, setRoomsMentioned] = useState([]);
  const [userList, setUserList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    if (!channelID || !user) return;
    getChannelInfo(
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

    return () => {
      setRoomList([]);
      detachListenersForChannel(channelID, user.uid);
    };
  }, [channelID, updateChannel, user, setError]);

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (roomList.length === 0) return;
    if (location.pathname === `/channels/${channelID}`)
      history.replace(`/channels/${channelID}/${roomList[0].id}`);
    finishLoading();
  }, [channelID, history, location.pathname, roomList, finishLoading]);

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
