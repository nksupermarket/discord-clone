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

async function getRoomStuff(roomID, setRoomName, setMsgList, setError) {
  try {
    const roomRef = ref(db, `Rooms/${roomID}`, setError);

    onValue(roomRef, (snap) => {
      const data = snap.val();

      setRoomName(data.name);

      let messages = data.messages || {};
      let msgList = [];
      updateMsgList();
      setMsgList(changeReplyFromIDtoMsgObj(msgList));
      //helpers
      function updateMsgList() {
        for (const id in messages) {
          messages[id].msgId = id; // set msgId
          msgList.push(messages[id]);
        }
      }
      function changeReplyFromIDtoMsgObj(arr) {
        // iterate over entire msgList
        // if msg has replyTo, replace the msgId with actual msgObj
        return arr.map((obj, i, thisArr) => {
          if (!obj.replyTo) return obj;

          obj.replyTo = thisArr.find((msgObj) => msgObj.msgId === obj.replyTo);
          return obj;
        });
      }
    });
  } catch (error) {
    setError && setError(error.message);
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

function pushToMsgList(roomId, msgObj, setError) {
  try {
    const roomMsgList = ref(db, `Rooms/${roomId}/messages`);
    const newMsgRef = push(roomMsgList);
    set(newMsgRef, msgObj);

    return newMsgRef.key;
  } catch (error) {
    setError(error.message);
    return null;
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
    setError(error.message);
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
    setError(error.message);
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
    setError(error.message);
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
    setError(error.message);
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
    setError && setError(error.message);
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
    setError && setError(error.message);
  }
}

/*async function setCurrentlyInRoom(channelId, roomId, userId, setError) {
  try {
    const updates = {};

    updates[`users/${userId}/channels/${channelId}/currently_in_room`] = roomId;
    updates[`users/${userId}/currently_in_room`] = roomId;

    update(ref(db), updates);
  } catch (error) {
    setError && setError(error.message);
  }
}*/

export {
  detachListenersForRoom,
  getRoomStuff,
  removeRoomFromUnread,
  pushToMsgList,
  setRoomExitTimestamp,
  setRoomExitTimestampOnDisconnect,
  removeOnDisconnectForRoomExitTimestamp,
  getRoomUnsubscribeStatus,
  attachUnreadMsgsListener,
  //setCurrentlyInRoom,
};
