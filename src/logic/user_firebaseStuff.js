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
import getUnixTime from 'date-fns/getUnixTime';

function detachListenersForUser(uid) {
  const channelListRef = ref(db, `users/${uid}/channels`);

  off(channelListRef);
}

async function createUser(email, password, displayName, channelId, setError) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName });
    if (channelId)
      set(ref(db, `users/${userCredential.user.uid}/channels`), {
        [channelId]: '',
      });
  } catch (error) {
    console.log(error);
    setError && setError(error.message);
    //setError(error.code);
  }
}

async function signIn(email, password, setUser, setError) {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    setError && setError(error.message);
    //setError(error.code);
  }
}

async function subscribeToChannel(uid, channelId, roomList, setError) {
  try {
    const newChannelRef = ref(db, `users/${uid}/channels/${channelId}`);

    let updates = {};

    roomList.forEach((roomId) => {
      updates[
        `users/${uid}/channels/${channelId}/unread_rooms/${roomId}`
      ] = true;
    });

    update(ref(db), updates);
  } catch (error) {
    setError && setError(error);
  }
}

async function getChannelList(uid, setChannelList, setError) {
  try {
    const userChannelListRef = ref(db, `users/${uid}/channels`);

    let channelList = [];

    onValue(userChannelListRef, async function (snap) {
      const data = snap.val();

      for (const id in data) {
        channelList.push({ role: data[id], id });
      }
      setChannelList && (await setChannelList(channelList));
    });
  } catch (error) {
    console.log(error);
    setError && setError(error.message);
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
        detachListenersForUser(uid);
      }

      await onDisconnect(userStatusRef).remove();
      await onDisconnect(userRef).update({
        isOnline: false,
        last_logged_in: getUnixTime(new Date()),
      });

      set(userStatusRef, {
        displayName,
        role: channel.role || '',
      });
      update(userRef, { isOnline: true });
    });
  });
}

function isUserOnline(uid) {
  const userRef = ref(db, `users/${uid}/isOnline`);

  return get(userRef);
}

export {
  createUser,
  signIn,
  isUserOnline,
  getChannelList,
  updateUserOnline,
  detachListenersForUser,
};
