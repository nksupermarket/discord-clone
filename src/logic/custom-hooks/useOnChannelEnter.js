import { useState, useEffect } from 'react';
import {
  getChannelInfo,
  detachListenersForChannel,
} from '../channel_firebaseStuff';
import { getUnreadRooms } from '../user_firebaseStuff';

export default function useOnChannelEnter(
  user,
  channelID,
  updateChannel,
  setError
) {
  const [roleList, setRoleList] = useState(['Online']);
  const [roomCategories, setRoomCategories] = useState(['none']);
  const [roomList, setRoomList] = useState([]);
  const [unreadRooms, setUnreadRooms] = useState([]);
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
    getUnreadRooms(user.uid, channelID, setUnreadRooms, setError);
    //getMentions(user.uid, channelID, setRoomsMentioned, setError);

    return () => detachListenersForChannel(channelID, user.uid);
  }, [channelID, updateChannel, user, setError]);

  return {
    roleList,
    roomCategories,
    roomsMentioned,
    roomList,
    unreadRooms,
    userList,
    onlineUsers,
    userRole,
  };
}
