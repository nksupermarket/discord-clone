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
  getRoomStuff,
} from '../room_firebaseStuff';
import getUnixTime from 'date-fns/getUnixTime';
import { updateMentions } from '../user_firebaseStuff';

export default function useOnRoomEnter(
  user,
  channelID,
  roomID,
  setRoomName,
  setError
) {
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    if (!user || !channelID || !roomID) return;
    detachListenersForRoom(roomID);
    removeRoomFromUnread(channelID, roomID, user.uid, setError);
    setRoomExitTimestampOnDisconnect(channelID, roomID, user.uid, setError);
    getRoomStuff(roomID, setRoomName, setMsgList);
    //setCurrentlyInRoom(channelID, roomID, user.uid, setError);

    return async function () {
      detachListenersForRoom(roomID);
      removeOnDisconnectForRoomExitTimestamp(channelID);
      const isRoomUnsubscribed = await getRoomUnsubscribeStatus();
      if (isRoomUnsubscribed) return;
      setRoomExitTimestamp(channelID, roomID, user.uid, setError);
      attachUnreadMsgsListener(channelID, roomID, user.uid, setError);
    };
  }, [roomID, channelID, user, setRoomName, setError]);

  return { msgList, submitMsg };

  function submitMsg(msg, replyTo, mentions) {
    const msgObj = {
      msg,
      replyTo: replyTo || '',
      mentions: mentions || [],
      user: user.uid,
      displayName: user.displayName,
      avatar: user.photoURL,
      color: user.color,
      timestamp: getUnixTime(new Date()),
    };
    const msgID = pushToMsgList(roomID, msgObj, setError);
    if (!msgID) return 'error';

    if (mentions.length > 0)
      mentions.forEach((mention) =>
        updateMentions(mention.uid, channelID, roomID, msgID, setError)
      );

    return 'success';
  }
}
