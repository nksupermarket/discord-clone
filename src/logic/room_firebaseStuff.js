import {
  getDatabase,
  ref,
  push,
  set,
  get,
  update,
  onValue,
  off,
  onDisconnect,
} from 'firebase/database';
import { db } from '../firebaseStuff';
import getUnixTime from 'date-fns/getUnixTime';

function detachListenersForRoom(roomId) {
  const msgListRef = ref(db, `Rooms/${roomId}/messages`);

  off(msgListRef);
}

async function getMsgList(roomId, setMsgList) {
  const msgListRef = ref(db, `Rooms/${roomId}/messages`);

  onValue(msgListRef, (snapshot) => {
    let data = snapshot.val();
    data = data || {};
    let msgList = [];
    for (const id in data) {
      msgList.push(data[id]);
    }
    setMsgList(msgList);
  });
}

async function pushToMsgList(roomId, msgObj) {
  try {
    const roomMsgList = ref(db, `Rooms/${roomId}/messages`);
    const newMsgRef = push(roomMsgList);
    set(newMsgRef, msgObj);
  } catch (error) {
    //setError(error)
    console.log(error);
  }
}

async function setRoomExitTimestamp(channelId, roomId, userId, setError) {
  try {
    const roomExitTimestampRef = ref(
      db,
      `Channels/${channelId}/users/${userId}/room_exit_timestamps`
    );

    update(roomExitTimestampRef, { [roomId]: getUnixTime(new Date()) });
  } catch (error) {
    setError(error);
  }
}

export { detachListenersForRoom, getMsgList, pushToMsgList };
