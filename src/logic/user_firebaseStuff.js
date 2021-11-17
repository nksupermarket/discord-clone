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
  updateEmail,
  updatePassword,
  deleteUser,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { getChannelIcons, getChannelNames } from './channel_firebaseStuff';
import { db } from '../firebaseStuff';
import getUnixTime from 'date-fns/getUnixTime';

function detachListenersForUser(uid) {
  const channelListRef = ref(db, `users/${uid}/channels`);

  off(channelListRef);
}

async function updateUserInfo(infoType, value, channelList) {
  const auth = getAuth();
  const user = auth.currentUser;

  switch (infoType) {
    case 'displayName': {
      updateProfile(user, { displayName: value });
      break;
    }
    case 'avatar': {
      updateProfile(user, { photoURL: value });
      break;
    }
    case 'color': {
      updateUserProfileColor(user.uid, value);
      break;
    }
    case 'email': {
      updateEmail(user, value);
      break;
    }
    case 'password': {
      updatePassword(user, value);
      break;
    }
    default: {
      return;
    }
  }
  if (channelList.length > 0) {
    const updateObj = { [infoType]: value };
    updateUserInfoForAllChannels(user.uid, channelList, updateObj);
  }
}
function updateUserProfileColor(uid, color) {
  const defaultColors = [
    'rgb(92, 100, 244)',
    'rgb(237, 66, 69)',
    'rgb(250, 166, 26)',
  ];
  color =
    color || defaultColors[Math.floor(Math.random() * defaultColors.length)];

  const userRef = ref(db, `users/${uid}`);
  update(userRef, { color });

  return color;
}
function updateUserInfoForAllChannels(uid, channelList, updateObj) {
  let updates = {};
  channelList.forEach((c) => {
    updates[`Channels/${c.id}/users/${uid}/`] = updateObj;
  });
  update(ref(db), updates);
}
async function removeUser(channelList, setError) {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    await deleteUser(user);
  } catch (error) {
    setError && setError(error.message);
  }
}

async function createUser(
  email,
  password,
  displayName,
  channelID,
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
    await updateProfile(userCredential.user, { displayName });
    const profileColor = await updateUserProfileColor();
    userCredential.user.color = profileColor;
    console.log(userCredential.user);

    if (channelID) subscribeToChannel(userCredential.user, channelID, setError);

    setUser(userCredential.user);

    return true;
  } catch (error) {
    setError && setError(error.message);
    return false;
    //setError(error.code);
  }
}

function signIn(email, password, setError) {
  const auth = getAuth();
  try {
    signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    setError && setError(error.message);
    //setError(error.code);
  }
}

async function subscribeToChannel(user, channelID, setError) {
  try {
    let updates = {};
    updates[`users/${user.uid}/channels/${channelID}`] = '';

    updates[`Channels/${channelID}/users/${user.uid}`] = {
      displayName: user.displayName,
      avatar: user.photoURL || '',
      color: user.color,
    };

    update(ref(db), updates);
  } catch (error) {
    setError && setError(error);
  }
}

function getChannelList(uid, setChannelList, setError) {
  try {
    const userChannelListRef = ref(db, `users/${uid}/channels`);

    onValue(userChannelListRef, async (snap) => {
      const data = snap.val();

      let channelList = [];
      for (const id in data) {
        channelList.push({ id, role: data[id] });
      }
      await getChannelIcons(channelList, updateChannelListWithIcons, setError);
      await getChannelNames(channelList, updateChannelListWithNames, setError);
      setChannelList(channelList);

      //helpers
      function updateChannelListWithIcons(icons) {
        icons.forEach((icon, i) => (channelList[i].icon = icon));
      }
      function updateChannelListWithNames(names) {
        names.forEach((name, i) => (channelList[i].name = name));
      }
    });
  } catch (error) {
    setError && setError(error.message);
  }
}

async function getUnreadRooms(uid, channelID, setUnreadRooms, setError) {
  try {
    const unreadRoomsRef = ref(db, `users/${uid}/unread_rooms/${channelID}`);

    onValue(unreadRoomsRef, (snap) => {
      const data = snap.val();
      if (!data) return setUnreadRooms([]);

      const unreadRooms = Object.keys(data);

      setUnreadRooms(unreadRooms);
    });
  } catch (error) {
    setError && setError(error.message);
  }
}

async function getRoleOfUser(channelID, userId, setRole, setError) {
  try {
    const userRoleRef = ref(db, `users/${userId}/channels/${channelID}`);
    onValue(userRoleRef, (snap) => {
      const data = snap.val();

      setRole(data);
    });
  } catch (error) {
    setError && setError(error.message);
    console.log(error);
  }
}

function updateUserOnline(uid, userChannelList, setError) {
  try {
    const connectedRef = ref(db, '.info/connected');
    // add user to online_users for all channels in their list
    userChannelList.forEach((channel) => {
      const userStatusRef = ref(db, `Channels/${channel.id}/users/${uid}`);

      onValue(connectedRef, async (snapshot) => {
        if (snapshot.val() === false) {
          off(connectedRef);
          detachListenersForUser(uid);
        }

        await onDisconnect(userStatusRef).update({ status: 'offline' });

        update(userStatusRef, {
          status: 'online',
        });
      });
    });
  } catch (error) {
    setError(error.message);
  }
}

function updateMentions(uid, channelID, roomID, msgID, setError) {
  const mentionsRef = ref(
    db,
    `users/${uid}/mentions/${channelID}/${roomID}/${msgID}`
  );
  try {
    set(mentionsRef, true);
  } catch (error) {
    setError(error.message);
  }
}

async function getMentions(uid, channelID, setRoomsMentioned, setError) {
  const mentionsRef = ref(db, `users/${uid}/mentions/${channelID}`);

  try {
    onValue(mentionsRef, (snap) => {
      const data = snap.val();
      setRoomsMentioned(data);
    });
  } catch (error) {
    setError(error.message);
  }
}

function isUserOnline(uid) {
  const userRef = ref(db, `users/${uid}/isOnline`);

  return get(userRef);
}

async function verifyPW(pw) {
  const auth = getAuth();
  const user = auth.currentUser;

  try {
    const credential = EmailAuthProvider.credential(user.email, pw);

    const status = await reauthenticateWithCredential(user, credential);
    if (status) return { isValid: true };
    return { error: 'something went wrong' };
  } catch (error) {
    return { error: error.message };
  }
}

export {
  updateUserInfo,
  createUser,
  signIn,
  isUserOnline,
  getRoleOfUser,
  getMentions,
  subscribeToChannel,
  getChannelList,
  updateUserOnline,
  updateMentions,
  getUnreadRooms,
  detachListenersForUser,
  verifyPW,
  removeUser,
};
