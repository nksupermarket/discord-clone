import { set } from 'date-fns';
import { useRef, useState, useMemo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getChannelInfo,
  detachListenersForChannel,
  getInfoForVisitingChannel,
} from '../channel_firebaseStuff';

export default function useOnChannelEnter(
  user,
  channelID,
  channelList,
  updateChannel,
  setError
) {
  const [visitingChannel, setVisitingChannel] = useState();
  const [roleList, setRoleList] = useState(['Online']);
  const [roomCategories, setRoomCategories] = useState(['none']);
  const [roomList, setRoomList] = useState([]);
  const [roomsMentioned, setRoomsMentioned] = useState([]);
  const [userList, setUserList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userRole, setUserRole] = useState();

  const isVisiting = useMemo(
    () => channelList?.every((c) => c.id !== channelID),
    [channelList, channelID]
  );
  const history = useHistory();
  const location = useLocation();

  useEffect(
    function onVisitToChannelNotSubscribedTo() {
      if (!user || !channelList) return;
      (async () => {
        if (!channelID || !isVisiting) return setVisitingChannel();
        if (visitingChannel) return;
        try {
          console.log('async running');
          const data = await getInfoForVisitingChannel(channelID);
          const channelInfo = {
            name: data[0],
            icon: data[1],
            defaultRoom: data[2],
          };
          setVisitingChannel(channelInfo);
        } catch (error) {
          setError(error.message);
        }
      })();
    },
    [user, channelID, channelList, visitingChannel, isVisiting, setError]
  );

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
      } catch (error) {
        setError(error.message);
      }
    })();

    return () => {
      detachListenersForChannel(channelID, user.uid);
    };
  }, [channelID, isVisiting, updateChannel, user, setError]);

  useEffect(
    function redirectToDefaultRoom() {
      if (!user || !channelList) return;
      if (
        location.pathname === `/channels/${channelID}` ||
        location.pathname === `/channels/${channelID}/`
      ) {
        //`/channels/${channelID}/` is pathname before user is redirected into default room
        if (isVisiting) {
          if (!visitingChannel) return;
          const defaultRoomID = Object.keys(visitingChannel.defaultRoom)[0];
          history.push(`/channels/${channelID}/${defaultRoomID}`);
        } else {
          const defaultRoomID =
            channelList &&
            Object.keys(
              channelList?.find((c) => c.id === channelID).defaultRoom
            )[0];
          history.replace(`/channels/${channelID}/${defaultRoomID}/`);
        }
      }
    },
    [
      user,
      channelID,
      channelList,
      history,
      isVisiting,
      visitingChannel,
      location.pathname,
    ]
  );

  return {
    visitingChannel,
    roleList,
    roomCategories,
    roomsMentioned,
    roomList,
    userList,
    onlineUsers,
    userRole,
  };
}
