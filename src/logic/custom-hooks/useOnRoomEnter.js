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
  finishLoading,
  setError
) {
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    if (!user || !channelID || !roomID) return;
    detachListenersForRoom(roomID);
    onRoomEnter();

    async function onRoomEnter() {
      try {
        await getRoomStuff(roomID, setRoomName, setMsgList, finishLoading);
      } catch (error) {
        setError(error.message);
      }
    }
    return function () {
      detachListenersForRoom(roomID);
      setMsgList([]);
    };
  }, [roomID, channelID, user, setRoomName, finishLoading, setError]);

  return { msgList, submitMsg };

  async function submitMsg(msg, replyTo, mentions, attachments) {
    const msgObj = {
      msg,
      user: user.uid,
      replyTo: replyTo || '',
      mentions: mentions || [],
      attachments: attachments || [],
      timestamp: getUnixTime(new Date()),
    };
    const msgID = await pushToMsgList(roomID, msgObj);

    if (mentions.length > 0)
      mentions.forEach((mention) =>
        updateMentions(mention.uid, channelID, roomID, msgID)
      );
  }
}
