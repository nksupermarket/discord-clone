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

function detachListenersForRoom(roomId) {
  const db = getDatabase();

  const msgListRef = ref(db, `Rooms/${roomId}/messages`);

  off(msgListRef);
}

async function getMsgList(roomId, setMsgList) {
  const db = getDatabase();
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
  const db = getDatabase();
  try {
    const roomMsgList = ref(db, `Rooms/${roomId}/messages`);
    const newMsgRef = push(roomMsgList);
    set(newMsgRef, msgObj);
  } catch (error) {
    //setError(error)
    console.log(error);
  }
}

export { detachListenersForRoom, getMsgList, pushToMsgList };
