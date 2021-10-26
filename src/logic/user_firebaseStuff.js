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

async function createUser(email, password, displayName, channelID, setError) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName });
    if (channelID) {
      let updates = {};

      updates[`users/${userCredential.user.uid}/channels`] = {
        [channelID]: '',
      };

      updates[`Channels/${channelID}/users`] = {
        [userCredential.user.uid]: displayName,
      };

      update(ref(db), updates);
    }

    return true;
  } catch (error) {
    console.log(error);
    setError && setError(error.message);
    return false;
    //setError(error.code);
  }
}

async function signIn(email, password, setError) {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    setError && setError(error.message);
    //setError(error.code);
  }
}

async function subscribeToChannel(uid, channelID, roomList, setError) {
  try {
    const newChannelRef = ref(db, `users/${uid}/channels/${channelID}`);

    let updates = {};

    roomList.forEach((roomID) => {
      updates[
        `users/${uid}/channels/${channelID}/unread_rooms/${roomID}`
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

async function updateUserOnline(uid, displayName, userChannelList, setError) {
  const userRef = ref(db, `users/${uid}`);

  const connectedRef = ref(db, '.info/connected');
  try {
    // add user to online_users for all channels in their list
    userChannelList.forEach((channel) => {
      const userStatusRef = ref(
        db,
        `Channels/${channel.id}/online_users/${uid}`
      );

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
          uid,
          role: channel.role || '',
        });
        update(userRef, { isOnline: true });
      });
    });
  } catch (error) {
    setError(error);
  }
}

function updateMentions(uid, channelID, roomID, msgID, setError) {
  const mentionsRef = ref(
    db,
    `users/${uid}/mentions/${channelID}/${roomID}/${msgID}`
  );
  console.log(`users/${uid}/mentions/${channelID}/${roomID}/${msgID}`);
  try {
    set(mentionsRef, true);
  } catch (error) {
    setError(error);
  }
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
  updateMentions,
  detachListenersForUser,
};
