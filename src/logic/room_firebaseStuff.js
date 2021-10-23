import {
  getDatabase,
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

function detachListenersForRoom(roomId) {
  const msgListRef = ref(db, `Rooms/${roomId}/messages`);

  off(msgListRef);
}

async function getRoomName(id, setError) {
  try {
    const roomNameRef = ref(db, `Rooms/${id}/name`);

    const data = await get(roomNameRef);

    return data.val();
  } catch (error) {
    setError && setError(error);
  }
}

async function removeRoomFromUnread(channelId, roomId, uid, setError) {
  try {
    const unreadRoomRef = ref(
      db,
      `users/${uid}/unread_rooms/${channelId}/${roomId}`
    );
    remove(unreadRoomRef);
  } catch (error) {
    setError && setError();
  }
}

async function getMsgList(roomId, setMsgList) {
  const msgListRef = ref(db, `Rooms/${roomId}/messages`);

  onValue(msgListRef, (snapshot) => {
    let data = snapshot.val();
    data = data || {};
    let msgList = [];
    for (const id in data) {
      data[id].msgId = id;
      msgList.push(data[id]);
    }

    setMsgList(changeReplyFromIDtoMsgObj(msgList));

    function changeReplyFromIDtoMsgObj(arr) {
      return arr.map((obj, i, thisArr) => {
        if (!obj.replyTo) return obj;

        obj.replyTo = thisArr.find((msgObj) => msgObj.msgId === obj.replyTo);
        return obj;
      });
    }
  });
}

function pushToMsgList(roomId, msgObj, setError) {
  try {
    const roomMsgList = ref(db, `Rooms/${roomId}/messages`);
    const newMsgRef = push(roomMsgList);
    set(newMsgRef, msgObj);

    return newMsgRef.key;
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
      if (!data) return;
      const keys = Object.keys(data) || null;
      const lastMsgKey = keys[keys.length - 1];
      const lastMsgTimestamp = data[lastMsgKey].timestamp;

      const roomExitTimestamp =
        (await getRoomExitTimestamp(channelId, roomId, userId, setError)) || 0;

      if (lastMsgTimestamp > roomExitTimestamp) {
        const roomUnreadRef = ref(
          db,
          `users/${userId}/unread_rooms/${channelId}`
        );

        update(roomUnreadRef, { [roomId]: true });

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

async function setRoomExitTimestampOnDisconnect(
  channelId,
  roomId,
  userId,
  setError
) {
  try {
    const roomExitTimestampRef = ref(
      db,
      `Channels/${channelId}/room_exit_timestamps/users/${userId}`
    );

    onDisconnect(roomExitTimestampRef).update({
      [roomId]: getUnixTime(new Date()),
    });
  } catch (error) {
    setError && setError(error);
  }
}

async function removeOnDisconnectForRoomExitTimestamp(
  channelId,
  roomId,
  userId,
  setError
) {
  try {
    const roomExitTimestampRef = ref(
      db,
      `Channels/${channelId}/room_exit_timestamps/users/${userId}`
    );

    onDisconnect(roomExitTimestampRef).cancel();
  } catch (error) {
    setError && setError(error);
  }
}

/*async function setCurrentlyInRoom(channelId, roomId, userId, setError) {
  try {
    const updates = {};

    updates[`users/${userId}/channels/${channelId}/currently_in_room`] = roomId;
    updates[`users/${userId}/currently_in_room`] = roomId;

    update(ref(db), updates);
  } catch (error) {
    setError && setError(error);
  }
}*/

export {
  detachListenersForRoom,
  getRoomName,
  removeRoomFromUnread,
  getMsgList,
  pushToMsgList,
  setRoomExitTimestamp,
  setRoomExitTimestampOnDisconnect,
  removeOnDisconnectForRoomExitTimestamp,
  getRoomUnsubscribeStatus,
  attachUnreadMsgsListener,
  //setCurrentlyInRoom,
};
