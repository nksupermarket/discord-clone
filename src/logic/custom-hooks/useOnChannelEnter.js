import { useState, useEffect } from 'react';
import {
  getRoomCategories,
  getRoomList,
  getOnlineUsers,
  getUserRoles,
  getRoleOfUser,
  detachListenersForChannel,
} from '../channel_firebaseStuff';

export default function useOnChannelEnter(user, channel, setError) {
  const [roleList, setRoleList] = useState(['Online']);
  const [roomCategories, setRoomCategories] = useState(['none']);
  const [roomList, setRoomList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [userRole, setUserRole] = useState();

  useEffect(() => {
    if (!channel || !user) return;

    getUserRoles(channel.id, setRoleList, setError);
    getOnlineUsers(channel.id, setOnlineUsers, setError);
    getRoleOfUser(channel.id, user.uid, setUserRole, setError);
    getRoomCategories(channel.id, setRoomCategories, setError);
    getRoomList(channel.id, setRoomList, setError);

    return () => detachListenersForChannel(channel.id);
  }, [channel, user, setError]);

  return { roleList, roomCategories, roomList, onlineUsers, userRole };
}
