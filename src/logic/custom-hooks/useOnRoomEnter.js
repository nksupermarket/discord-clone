import { useState, useEffect } from 'react';
import {
  detachListenersForRoom,
  pushToMsgList,
  getRoomStuff,
} from '../room_firebaseStuff';
import getUnixTime from 'date-fns/getUnixTime';
import { dealWithReadMentions, updateMentions } from '../user_firebaseStuff';

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
    onRoomEnter();

    async function onRoomEnter() {
      try {
        await getRoomStuff(roomID, setRoomName, setMsgList, finishLoading);
        await dealWithReadMentions(user.uid, channelID, roomID);
      } catch (error) {
        setError(error.message);
      }
    }
    return async function () {
      try {
        detachListenersForRoom(roomID);
        await dealWithReadMentions(user.uid, channelID, roomID); // for any mentions that occur when user is in room
        setMsgList([]);
      } catch (error) {
        setError(error.message);
      }
    };
  }, [roomID, channelID, user, setRoomName, finishLoading, setError]);

  return { msgList, submitMsg };

  async function submitMsg(msg, replyTo, mentions, attachments) {
    const msgObj = {
      msg,
      user: user.uid,
      replyTo: replyTo || null,
      mentions: mentions || null,
      attachments: attachments || null,
      timestamp: getUnixTime(new Date()),
    };
    const msgID = await pushToMsgList(roomID, msgObj);

    if (mentions.length > 0)
      mentions.forEach(async (mention) => {
        try {
          await updateMentions(mention.uid, channelID, roomID, msgID);
        } catch (error) {
          setError(error.message);
        }
      });
  }
}
