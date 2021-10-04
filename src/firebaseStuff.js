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
  onDisconnect,
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
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    updateProfile(userCredential.user, { displayName });
    await addUser();
    updateUserOnline(userCredential.user.uid, displayName);
    setUser(userCredential.user);

    function addUser() {
      const db = getDatabase();
      set(ref(db, `users/${userCredential.user.uid}/channels`), {
        [channelId]: false,
      });
      set(ref(db, `Channels/${channelId}/users/${userCredential.user.uid}`), {
        displayName,
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
    updateUserOnline(userCredential.user.uid, userCredential.user.displayName);
    setUser(userCredential.user);
  } catch (error) {
    console.log(error);
    //setError(error.code);
  }
}

async function getChannelList(uid) {
  const dbRef = ref(getDatabase());

  const list = await get(child(dbRef, `users/${uid}/channels`));
  const data = list.val();
  let channelList = [];
  for (const id in data) {
    channelList.push({ ...data[id], id });
  }

  return channelList;
}

async function createChannel(name) {
  const db = getDatabase();
  const channelListRef = ref(db, 'Channels');
  const newChannelRef = push(channelListRef);
  set(newChannelRef, { name });
  return newChannelRef.key;
}

async function getRoomList(channelId, setRoomList) {
  const db = getDatabase();

  const roomsRef = ref(db, `Channels/${channelId}/rooms`);

  onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();

    let roomList = [];
    for (const id in data) {
      roomList.push({ ...data[id], id });
    }
    console.log(roomList);
    setRoomList(roomList);
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

async function getRoomCategories(channelId, setRoomCategories, setError) {
  const db = getDatabase();

  try {
    const roomCategoriesRef = ref(db, `Channels/${channelId}/room_categories`);

    onValue(roomCategoriesRef, (snap) => {
      const data = snap.val();

      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }
}

async function createRoomCategory(channelId, name, setError) {
  const db = getDatabase();

  try {
    const channelRoomCategoriesRef = ref(
      db,
      `Channels/${channelId}/room_categories`
    );
    const newCategoryRef = push(channelRoomCategoriesRef);
    set(newCategoryRef, { name });
  } catch (error) {
    console.log(error);
  }
}

async function updateRoomCateogry(channelId, roomId, category, setError) {
  const db = getDatabase();

  try {
    const channelRoomRef = ref(db, `Channels/${channelId}/rooms/${roomId}`);
    update(channelRoomRef, { category });
  } catch (error) {
    console.log(error);
  }
}

async function getOnlineUsers(channelId, setUserList) {
  const db = getDatabase();
  const onlineUsersRef = ref(db, `Channels/${channelId}/online_users`);

  try {
    onValue(onlineUsersRef, (snapshot) => {
      let data = snapshot.val();
      let userList = [];
      for (const id in data) {
        userList.push(data[id]);
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

async function updateUserOnline(uid, displayName) {
  const db = getDatabase();
  const userRef = ref(db, `users/${uid}`);

  const connectedRef = ref(db, '.info/connected');

  // set user to online
  const userChannelList = await getChannelList(uid);

  // add user to online_users for all channels in their list
  userChannelList.forEach((channel) => {
    const userStatusRef = ref(db, `Channels/${channel.id}/online_users/${uid}`);

    onValue(connectedRef, async function (snapshot) {
      if (snapshot.val() === false) return;

      await onDisconnect(userStatusRef).remove();
      await onDisconnect(userRef).update({ isOnline: false });

      set(userStatusRef, { displayName });
      update(userRef, { isOnline: true });
    });
  });
}

async function createUserRole(channelId, role) {
  const db = getDatabase();

  try {
    const channelUserRolesRef = ref(db, `Channels/${channelId}/user_roles`);
    const newRoleRef = push(channelUserRolesRef);
    set(newRoleRef, { role });
  } catch (error) {
    console.log(error);
  }
}

async function updateRoleOfUser(channelId, userId, role, setError) {
  const db = getDatabase();

  try {
    const userRef = ref(db, `Channels/${channelId}/users/${userId}`);

    update(userRef, { role });
  } catch (error) {
    console.log(error);
  }
}

async function getRoleOfUser(channelId, userId, setRole, setError) {
  const db = getDatabase();

  try {
    const userRoleRef = ref(db, `users/${userId}/channels/${channelId}`);
    onValue(userRoleRef, (snap) => {
      const data = snap.val();

      console.log(data);
      //setRole()
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  createUser,
  signIn,
  getChannelList,
  createChannel,
  getRoomCategories,
  createRoomCategory,
  updateRoomCateogry,
  getRoomList,
  createRoom,
  getMsgList,
  pushToMsgList,
  getOnlineUsers,
  createUserRole,
  updateRoleOfUser,
};

//login user
// pull Channels user is subscribed to
// can pull all the rooms too

// when user clicks on a room, pull messages
