import {
  ref,
  push,
  set,
  get,
  update,
  onValue,
  off,
  remove,
  onDisconnect,
} from 'firebase/database';
import { db } from '../firebaseStuff';
import getUnixTime from 'date-fns/getUnixTime';

function detachListenersForRoom(roomID) {
  const roomRef = ref(db, `Rooms/${roomID}`);

  off(roomRef);
}

async function getRoomStuff(roomID, setRoomName, setMsgList, finishLoading) {
  const roomRef = ref(db, `Rooms/${roomID}`);

  onValue(roomRef, async (snap) => {
    const data = snap.val();

    await setRoomName(data.name);

    let messages = data.messages || {};
    let msgList = [];
    updateMsgList();
    await setMsgList(changeReplyFromIDtoMsgObj(msgList));
    finishLoading && finishLoading();
    //helpers
    function updateMsgList() {
      for (const id in messages) {
        messages[id].msgId = id; // set msgId
        msgList.push(messages[id]);
      }
    }
    function changeReplyFromIDtoMsgObj(arr) {
      // if msg has replyTo, replace the msgId with actual msgObj
      return arr.map((obj, i, thisArr) => {
        if (!obj.replyTo) return obj;

        obj.replyTo = thisArr.find((msgObj) => msgObj.msgId === obj.replyTo);
        return obj;
      });
    }
  });
}

async function pushToMsgList(roomId, msgObj) {
  const roomMsgList = ref(db, `Rooms/${roomId}/messages`);
  const newMsgRef = push(roomMsgList);
  set(newMsgRef, msgObj);

  return newMsgRef.key;
}

export { detachListenersForRoom, getRoomStuff, pushToMsgList };
