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

async function pushToMsgList(roomId, msgObj, setError) {
  try {
    const roomMsgList = ref(db, `Rooms/${roomId}/messages`);
    const newMsgRef = push(roomMsgList);
    set(newMsgRef, msgObj);
  } catch (error) {
    setError(error);
  }
}

async function getRoomUnsubscribeStatus(roomId, userId, setError) {
  try {
    const userRoomsUnsubscribedRef = ref(
      db,
      `users/${userId}/rooms_unsubscribed/${roomId}`
    );

    const isUnsubscribed = await (await get(userRoomsUnsubscribedRef)).val();

    return isUnsubscribed;
  } catch (error) {
    setError(error);
  }
}

async function attachUnreadMsgsListener(channelId, roomId, userId, setError) {
  try {
    const msgListRef = ref(db, `Rooms/${roomId}/messages`);

    onValue(msgListRef, async function (snap) {
      const data = snap.val();
      const keys = Object.keys(data);
      const lastMsgKey = keys[keys.length - 1];
      const lastMsgTimestamp = data[lastMsgKey].timestamp;

      const roomExitTimestamp =
        (await getRoomExitTimestamp(channelId, roomId, userId, setError)) || 0;

      if (lastMsgTimestamp > roomExitTimestamp) {
        const roomUnreadRef = ref(db, `Channels/rooms/${roomId}`);

        update(roomUnreadRef, { unread: true });

        off(msgListRef);
      }
    });
  } catch (error) {
    setError(error);
  }
}

async function getRoomExitTimestamp(channelId, roomId, userId, setError) {
  try {
    const roomExitTimestampRef = ref(
      db,
      `Channels/${channelId}/room_exit_timestamps/users/${userId}/${roomId}`
    );

    const timestamp = await (await get(roomExitTimestampRef)).val();

    console.log(timestamp);
    return timestamp;
  } catch (error) {
    setError(error);
  }
}

async function setRoomExitTimestamp(channelId, roomId, userId, setError) {
  try {
    const roomExitTimestampRef = ref(
      db,
      `Channels/${channelId}/room_exit_timestamps/users/${userId}`
    );

    update(roomExitTimestampRef, { [roomId]: getUnixTime(new Date()) });
  } catch (error) {
    setError(error);
  }
}

async function setCurrentlyInRoom(channelId, roomId, userId, setError) {
  try {
    const updates = {};

    updates[`users/${userId}/channels/${channelId}/currently_in_room`] = roomId;
    updates[`users/${userId}/currently_in_room`] = roomId;

    update(ref(db), updates);
  } catch (error) {
    setError && setError(error);
  }
}

export {
  detachListenersForRoom,
  getMsgList,
  pushToMsgList,
  setRoomExitTimestamp,
  getRoomUnsubscribeStatus,
  attachUnreadMsgsListener,
  setCurrentlyInRoom,
};
