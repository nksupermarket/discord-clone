import { useState, useEffect } from 'react';
import {
  detachListenersForRoom,
  getMsgList,
  pushToMsgList,
  getRoomUnsubscribeStatus,
  setRoomExitTimestamp,
  attachUnreadMsgsListener,
  //setCurrentlyInRoom,
  setRoomExitTimestampOnDisconnect,
  removeOnDisconnectForRoomExitTimestamp,
  removeRoomFromUnread,
} from '../room_firebaseStuff';
import getUnixTime from 'date-fns/getUnixTime';
import { updateMentions } from '../user_firebaseStuff';

export default function useOnRoomEnter(user, channel, room, setError) {
  const [msgList, setMsgList] = useState([]);

  console.log({ isRoom: !!room });

  useEffect(() => {
    console.log({ isRoom: !!room });
    if (!user || !channel || !room) return;
    detachListenersForRoom(room.id);
    removeRoomFromUnread(channel.id, room.id, user.uid, setError);
    setRoomExitTimestampOnDisconnect(channel.id, room.id, user.uid, setError);
    getMsgList(room.id, setMsgList, setError);
    //setCurrentlyInRoom(channel.id, room.id, user.uid, setError);

    return async function () {
      detachListenersForRoom(room.id);
      removeOnDisconnectForRoomExitTimestamp(channel.id);
      const isRoomUnsubscribed = await getRoomUnsubscribeStatus();
      if (isRoomUnsubscribed) return;
      setRoomExitTimestamp(channel.id, room.id, user.uid, setError);
      attachUnreadMsgsListener(channel.id, room.id, user.uid, setError);
    };
  }, [room, channel, user, setError]);

  console.log('roomLeave');
  return { msgList, submitMsg };

  function submitMsg(msg, replyTo, mention) {
    replyTo = replyTo || '';

    const msgObj = {
      msg,
      replyTo,
      mention: mention.displayName || '',
      user: user.uid,
      displayName: user.displayName,
      timestamp: getUnixTime(new Date()),
    };
    const msgID = pushToMsgList(room.id, msgObj, setError);

    if (mention)
      updateMentions(mention.uid, channel.id, room.id, msgID, setError);
  }
}
