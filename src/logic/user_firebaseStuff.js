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
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getRoleOfUser } from './channel_firebaseStuff';
import { db } from '../firebaseStuff';

function detachListenersforUser(uid) {
  const channelListRef = ref(db, `users/${uid}/channels`);

  off(channelListRef);
}

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
      set(ref(db, `users/${userCredential.user.uid}/channels`), {
        [channelId]: true,
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

async function getChannelList(uid, setChannelList) {
  try {
    const userChannelListRef = ref(db, `users/${uid}/channels`);

    onValue(userChannelListRef, (snap) => {
      const data = snap.val();
      let channelList = [];

      for (const id in data) {
        channelList.push({ role: data[id], id });
      }
      setChannelList(channelList);
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateUserOnline(uid, displayName) {
  const userRef = ref(db, `users/${uid}`);

  const connectedRef = ref(db, '.info/connected');

  // set user to online
  let userChannelList = [];

  await getChannelList(uid, (list) => (userChannelList = list));

  // add user to online_users for all channels in their list
  userChannelList.forEach((channel) => {
    const userStatusRef = ref(db, `Channels/${channel.id}/online_users/${uid}`);

    onValue(connectedRef, async function (snapshot) {
      if (snapshot.val() === false) {
        off(connectedRef);
        detachListenersforUser(uid);
      }

      await onDisconnect(userStatusRef).remove();
      await onDisconnect(userRef).update({ isOnline: false });

      set(userStatusRef, { displayName, role: channel.role });
      update(userRef, { isOnline: true });
    });
  });
}

function isUserOnline(uid) {
  const userRef = ref(db, `users/${uid}/isOnline`);

  return get(userRef);
}

export { createUser, signIn, isUserOnline, getChannelList };
