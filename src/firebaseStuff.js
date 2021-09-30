import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  child,
  push,
  set,
  get,
  update,
  onValue,
} from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC8GZMfCxqOUIFsa2OYlXcMzfQKfAobukQ',

  authDomain: 'bread-8adf4.firebaseapp.com',

  databaseURL: 'https://bread-8adf4-default-rtdb.firebaseio.com',

  projectId: 'bread-8adf4',

  storageBucket: 'bread-8adf4.appspot.com',

  messagingSenderId: '163895954776',

  appId: '1:163895954776:web:81bdb5187f320d28a4692d',
};

initializeApp(firebaseConfig);

async function createUser(
  email,
  password,
  displayName,
  channelId,
  setUser,
  setError
) {
  console.log({ email, password, displayName, channelId, setUser, setError });
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    updateProfile(userCredential.user, { displayName });
    addUser();
    setUser(userCredential.user);

    function addUser() {
      const db = getDatabase();
      set(ref(db, `users/${userCredential.user.uid}`), {
        [channelId]: true,
      });
      set(ref(db, `Channels/${channelId}/users/${userCredential.user.uid}`), {
        displayName,
        isOnline: true,
      });
    }
  } catch (error) {
    console.log(error);
    //setError(error.code);
  }
}

async function signIn(email, password, setUser, setError) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(userCredential.user);
  } catch (error) {
    console.log(error);
    //setError(error.code);
  }
}

async function getChannelList(uid) {
  const dbRef = ref(getDatabase());

  const list = await get(child(dbRef, `users/${uid}`));

  return list.val();
}

async function createChannel(name) {
  const db = getDatabase();
  const channelListRef = ref(db, 'Channels');
  const newChannelRef = push(channelListRef);
  set(newChannelRef, { name });
  return newChannelRef.key;
}

async function getRooms(channelId, setRoomList) {
  const db = getDatabase();

  const roomsRef = ref(db, `Channels/${channelId}/rooms`);

  onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

async function createRoom(channelId, name, setError) {
  const db = getDatabase();
  try {
    const channelRoomListRef = ref(db, `Channels/${channelId}/rooms`);
    const newRoomRef = push(channelRoomListRef);
    set(newRoomRef, { name });

    set(ref(db, `Rooms/${newRoomRef.key}`), {
      name,
    });
  } catch (error) {
    console.log(error);
    //setError(error);
  }
}

async function getOnlineUsers(channelId, setUserList) {
  const db = getDatabase();
  const onlineUsersRef = ref(db, `Channels/${channelId}/users`);

  try {
    onValue(onlineUsersRef, (snapshot) => {
      let data = snapshot.val();
      console.log(data);
      let userList = [];
      for (const id in data) {
        if (data[id].isOnline) userList.push(data[id]);
      }
      setUserList(userList);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getMsgList(roomId, setMsgList) {
  const db = getDatabase();
  const msgListRef = ref(db, `Rooms/${roomId}/messages`);

  onValue(msgListRef, (snapshot) => {
    let data = snapshot.val();
    console.log(data);
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

export {
  createUser,
  signIn,
  getChannelList,
  createChannel,
  getRooms,
  createRoom,
  getMsgList,
  pushToMsgList,
  getOnlineUsers,
};

//login user
// pull Channels user is subscribed to
// can pull all the rooms too

// when user clicks on a room, pull messages
