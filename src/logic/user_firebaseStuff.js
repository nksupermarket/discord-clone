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
    if (channelId) await addChannelToUser();
    setUser(userCredential.user);

    async function addChannelToUser() {
      set(ref(db, `users/${userCredential.user.uid}/channels`), {
        [channelId]: true,
      });
    }
  } catch (error) {
    console.log(error);
    setError && setError(error);
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
    setError && setError(error);
    //setError(error.code);
  }
}

async function getChannelList(uid, setChannelList, setError) {
  try {
    const userChannelListRef = ref(db, `users/${uid}/channels`);

    let channelList = [];

    return onValue(userChannelListRef, (snap) => {
      const data = snap.val();

      for (const id in data) {
        channelList.push({ role: data[id], id });
      }
      setChannelList && setChannelList(channelList);
    });
  } catch (error) {
    console.log(error);
    setError && setError(error);
  }
}

async function updateUserOnline(uid, displayName, userChannelList) {
  const userRef = ref(db, `users/${uid}`);

  const connectedRef = ref(db, '.info/connected');

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

export { createUser, signIn, isUserOnline, getChannelList, updateUserOnline };
