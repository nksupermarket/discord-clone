import {
  ref,
  push,
  set,
  get,
  update,
  onValue,
  off,
  query,
  orderByKey,
  orderByChild,
  startAt,
  startAfter,
  endBefore,
  limitToFirst,
  limitToLast,
} from 'firebase/database';
import {
  ref as store,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '../firebaseStuff';
import { isUserOnline } from './user_firebaseStuff';

async function createSampleChannels(num) {
  for (let i = 0; i < num; i++) {
    await createChannel(`sample channel ${i}`, true);
  }
}

async function createChannel(name, isPublic, icon) {
  const channelListRef = ref(db, 'Channels');
  const newChannelRef = push(channelListRef);
  await set(newChannelRef, { name });

  let iconURL = icon ? await changeChannelIcon(newChannelRef.key, icon) : '';
  if (isPublic)
    await set(ref(db, `public_channels/${newChannelRef.key}`), {
      name,
      icon: iconURL,
      description:
        'This is a new channel and there is no description for it at the moment.',
    });
  await createRoom(newChannelRef.key, 'general', null);
  return newChannelRef.key;
}

async function deleteChannels() {
  let updates = {};

  [
    '-Mp9N-JNC7jgBKurBZCn',
    '-MpYOwEQmhBEBW7zWIWL',
    '-MqCDfO8KLUpNbHiuP9q',
    '-MqCG7RuBJ53MGGTuu7O',
    '-MqCGdvGmSp57SUBYdVp',
    '-MqCGh4rVYnMIiCOeokE',
  ].forEach((key) => {
    updates[`public_channels/${key}`] = null;
    updates[`Channels/${key}`] = null;
  });

  update(ref(db), updates);
}

async function searchPublicChannels(searchVal) {
  const snap = await get(
    query(
      ref(db, '/public_channels/'),
      orderByChild('name'),
      startAt(searchVal)
    )
  );
  const data = snap.val();
  const processed = Object.keys(data).map((key) => ({ ...data[key], id: key }));
  return processed;
}

async function getPublicChannels(status, key) {
  let snap;
  switch (status) {
    case 'init':
      snap = await get(query(ref(db, `public_channels/`), limitToFirst(20)));
      break;
    case 'next':
      snap = await get(
        query(
          ref(db, `public_channels/`),
          orderByKey(),
          startAfter(key),
          limitToFirst(20)
        )
      );
      break;
    case 'prev':
      snap = await get(
        query(
          ref(db, `public_channels/`),
          orderByKey(),
          endBefore(key),
          limitToLast(20)
        )
      );
      break;
    default:
      return;
  }
  const data = snap.val();
  if (!data) return;
  const processed = Object.keys(data).map((key) => ({ ...data[key], id: key }));
  return processed;
}

async function changeChannelIcon(channelID, image) {
  const channelIconRef = store(storage, `channel_icons/${channelID}`);
  await uploadBytes(channelIconRef, image);
  const imageURL = await getDownloadURL(channelIconRef);
  await update(ref(db, `Channels/${channelID}`), { icon: imageURL });
}

function detachListenersForChannel(channelID, uid) {
  const channelInfoRef = ref(db, `Channels/${channelID}`);

  off(channelInfoRef);
}

async function getChannelInfo(
  channelID,
  updateChannel,
  setRoomCategories,
  setRoomList,
  setUserRoles,
  setUserList,
  setOnlineUsers,
  setError
) {
  try {
    const channelRef = ref(db, `Channels/${channelID}`);
    onValue(channelRef, (snap) => {
      const data = snap.val();

      updateChannel(data.name, data.icon || '');

      const roomCategories = data.room_categories
        ? Object.keys(data.room_categories)
        : [];
      setRoomCategories(['none', ...roomCategories]);

      let roomListArr = [];
      pushToRoomListArr(data.rooms);
      setRoomList(roomListArr);

      const userRoles = data.user_roles ? Object.keys(data.user_roles) : [];
      setUserRoles([...userRoles, 'Online']);

      let userList = [];
      pushToUserListArr(data.users);
      setUserList(userList);
      const onlineUsers = userList.filter((user) => user.status === 'online');
      setOnlineUsers(onlineUsers);

      //helpers
      function pushToRoomListArr(data) {
        for (const id in data) {
          roomListArr.push({ ...data[id], id });
        }
      }
      function pushToUserListArr(data) {
        for (const id in data) {
          const userInfo = { ...data[id], uid: id };
          userList.push(userInfo);
        }
      }
    });
  } catch (error) {
    setError && setError(error.message);
  }
}

async function getRoomList(channelID, setRoomList, setError) {
  try {
    const roomListRef = ref(db, `Channels/${channelID}/rooms`);

    const snap = await get(roomListRef);
    const data = snap.val();

    let roomList = [];
    for (const id in data) {
      roomList.push({ ...data[id], id });
    }
    setRoomList(roomList);
  } catch (error) {
    setError(error.message);
  }
}

async function createRoom(channelID, name, category) {
  const channelRoomListRef = ref(db, `Channels/${channelID}/rooms`);
  const newRoomRef = push(channelRoomListRef);

  await set(newRoomRef, { name, category });

  await set(ref(db, `Rooms/${newRoomRef.key}`), {
    name,
  });
}

async function getInfoForChannelList(type, channelList, updateChannelList) {
  const resultArr = await Promise.all(
    channelList.map((channel) => {
      let infoRef;
      switch (type) {
        case 'name':
          infoRef = ref(db, `Channels/${channel.id}/name`);
          break;
        case 'icon':
          infoRef = ref(db, `Channels/${channel.id}/icon`);
          break;
        case 'defaultRoom':
          infoRef = query(
            ref(db, `Channels/${channel.id}/rooms`),
            limitToFirst(1)
          );
          break;
        default:
          throw new Error('not a valid info type');
      }
      return get(infoRef);
    })
  );
  updateChannelList(
    type,
    resultArr.map((result) => result.val())
  );
}

async function getInfoForVisitingChannel(channelID) {
  const resultArr = await Promise.all([
    get(ref(db, `Channels/${channelID}/name`)),
    get(ref(db, `Channels/${channelID}/icon`)),
    get(query(ref(db, `Channels/${channelID}/rooms`), limitToFirst(1))),
  ]);

  return resultArr.map((result) => result.val());
}

async function createRoomCategory(channelID, name) {
  const channelRoomCategoriesRef = ref(
    db,
    `Channels/${channelID}/room_categories`
  );
  await update(channelRoomCategoriesRef, { [name]: true });
}

async function updateCategoryOfRoom(channelID, roomID, category) {
  const channelRoomRef = ref(db, `Channels/${channelID}/rooms/${roomID}`);
  await update(channelRoomRef, { category });
}

async function updateRoomName(channelID, roomID, name) {
  await update(ref(db, `Channels/${channelID}/rooms/${roomID}`), { name });
  await update(ref(db, `Rooms/${roomID}`), { name });
}

async function deleteRoom(channelID, roomID) {
  let updates = {};
  updates[`Channels/${channelID}/rooms/${roomID}`] = null;
  updates[`Rooms/${roomID}`] = null;
  await update(ref(db), updates);
}

async function createUserRole(channelID, role) {
  const channelUserRolesRef = ref(db, `Channels/${channelID}/user_roles`);
  update(channelUserRolesRef, { [role]: true });
}

async function updateRoleOfUser(channelID, userId, role, setError) {
  try {
    let updates = {};
    updates[`users/${userId}/channels/${channelID}`] = role;
    if (isUserOnline(userId))
      updates[`Channels/${channelID}/online_users/${userId}/role`] = role;

    update(ref(db), updates);
  } catch (error) {
    setError && setError(error.message);
  }
}

function beginUpload(file) {
  const storageRef = store(storage, `uploadedFiles/${file.name}`);
  return uploadBytesResumable(storageRef, file);
}
function cancelUpload(task) {
  if (task._state) return deleteFile(task._ref);
  task.cancel();
}
function deleteFile(ref) {
  deleteObject(ref);
}
function listenToUploadProgress(task, setProgress) {
  task.on('state_changed', (snap) => {
    const progress = Math.round(
      (snap.bytesTransferred / snap.totalBytes) * 100
    );
    setProgress(progress);
  });
}
export {
  getInfoForVisitingChannel,
  getPublicChannels,
  createChannel,
  changeChannelIcon,
  getChannelInfo,
  getInfoForChannelList,
  getRoomList,
  createRoomCategory,
  updateCategoryOfRoom,
  createRoom,
  createUserRole,
  updateRoleOfUser,
  detachListenersForChannel,
  deleteChannels,
  searchPublicChannels,
  beginUpload,
  cancelUpload,
  listenToUploadProgress,
  deleteRoom,
  updateRoomName,
  createSampleChannels,
};
