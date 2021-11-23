import { useState, useEffect } from 'react';
import {
  detachListenersForRoom,
  getMsgList,
  pushToMsgList,
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
    getRoomStuff(roomID, setRoomName, setMsgList);

    return async function () {
      detachListenersForRoom(roomID);
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
