import { updatePassword } from '@firebase/auth';
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  update,
  onValue,
  off,
  query,
  orderByValue,
  startAt,
  limitToFirst,
  onDisconnect,
} from 'firebase/database';
import { ref as store, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseStuff';
import { isUserOnline } from './user_firebaseStuff';

async function createChannel(name, isPublic, icon) {
  const channelListRef = ref(db, 'Channels');
  const newChannelRef = push(channelListRef);
  await set(newChannelRef, { name });
  console.log({
    name,
    description:
      'This is a new channel and there is no description for it at the moment.',
  });

  let iconURL = icon ? await changeChannelIcon(newChannelRef.key, icon) : '';
  if (isPublic)
    await set(ref(db, `public_channels/${newChannelRef.key}`), {
      name,
      icon: iconURL,
      description:
        'This is a new channel and there is no description for it at the moment.',
    });
  await createRoom(newChannelRef.key, 'general');
  return newChannelRef.key;
}

async function getPublicChannels(startAtKey) {
  let snap = startAtKey
    ? await get(
        query(ref(db, `public_channels/`), startAt(startAtKey).limitToFirst(10))
      )
    : await get(query(ref(db, `public_channels/`), limitToFirst(10)));

  let data = snap.val();
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

async function createRoom(channelID, name) {
  const channelRoomListRef = ref(db, `Channels/${channelID}/rooms`);
  const newRoomRef = push(channelRoomListRef);

  set(newRoomRef, { name });

  set(ref(db, `Rooms/${newRoomRef.key}`), {
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

function createRoomCategory(channelID, name, setError) {
  try {
    const channelRoomCategoriesRef = ref(
      db,
      `Channels/${channelID}/room_categories`
    );
    update(channelRoomCategoriesRef, { [name]: true });
  } catch (error) {
    setError && setError(error.message);
    console.log(error);
  }
}

function updateCategoryOfRoom(channelID, roomId, category, setError) {
  try {
    const channelRoomRef = ref(db, `Channels/${channelID}/rooms/${roomId}`);
    update(channelRoomRef, { category });
  } catch (error) {
    setError && setError(error.message);
    console.log(error);
  }
}

async function createUserRole(channelID, role, setError) {
  try {
    const channelUserRolesRef = ref(db, `Channels/${channelID}/user_roles`);
    /* const newRoleRef = push(channelUserRolesRef);
    set(newRoleRef, { role }); */

    update(channelUserRolesRef, { [role]: true });
  } catch (error) {
    setError && setError(error.message);
    console.log(error);
  }
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

export {
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
};
