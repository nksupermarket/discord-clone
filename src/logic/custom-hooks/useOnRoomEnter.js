import { useState, useEffect } from 'react';
import {
  detachListenersForRoom,
  getMsgList,
  pushToMsgList,
  getRoomUnsubscribeStatus,
  setRoomExitTimestamp,
  attachUnreadMsgsListener,
  setCurrentlyInRoom,
  setRoomExitTimestampOnDisconnect,
  removeOnDisconnectForRoomExitTimestamp,
} from './logic/room_firebaseStuff';
import getUnixTime from 'date-fns/getUnixTime';

export default function useOnRoomEnter(user, channel, room, setError) {
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    if (!user || !channel || !room) return;
    setRoomExitTimestampOnDisconnect(channel.id, room.id, user.uid, setError);
    getMsgList(room.id, setMsgList, setError);
    setCurrentlyInRoom(channel.id, room.id, user.uid, setError);

    return async function () {
      detachListenersForRoom(room.id);
      removeOnDisconnectForRoomExitTimestamp(channel.id);
      const isRoomUnsubscribed = await getRoomUnsubscribeStatus();
      if (isRoomUnsubscribed) return;
      setRoomExitTimestamp(channel.id, room.id, user.uid, setError);
      attachUnreadMsgsListener(channel.id, room.id, user.uid, setError);
    };
  }, [room, channel, user, setError]);

  return { msgList, submitMsg };

  function submitMsg(msg) {
    const msgObj = {
      user: user.uid,
      displayName: user.displayName,
      msg,
      timestamp: getUnixTime(new Date()),
    };
    pushToMsgList(room.id, msgObj, setError);
  }
}
