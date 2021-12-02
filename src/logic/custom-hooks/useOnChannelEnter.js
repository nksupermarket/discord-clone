import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getChannelInfo,
  detachListenersForChannel,
} from '../channel_firebaseStuff';

export default function useOnChannelEnter(
  user,
  channelID,
  channelList,
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

  useEffect(() => {
    if (!channelID || !user) return;
    (async () => {
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
    })();

    return () => {
      detachListenersForChannel(channelID, user.uid);
    };
  }, [channelID, updateChannel, user, setError]);

  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === `/channels/${channelID}/`) {
      //`/channels/${channelID}/` is pathname when user clicks on the channel nav btn
      const defaultRoomID = Object.keys(
        channelList.find((c) => c.id === channelID).defaultRoom
      )[0];
      history.replace(`/channels/${channelID}/${defaultRoomID}/`);
    }
  }, [channelID, channelList, history, location.pathname]);

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
