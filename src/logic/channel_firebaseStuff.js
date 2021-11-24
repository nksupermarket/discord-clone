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
  orderByValue,
  limitToFirst,
  onDisconnect,
} from 'firebase/database';
import { ref as store, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseStuff';
import { isUserOnline } from './user_firebaseStuff';

async function createChannel(name) {
  const channelListRef = ref(db, 'Channels');
  const newChannelRef = push(channelListRef);
  await set(newChannelRef, { name });
  await createRoom(newChannelRef.key, 'general');
  return newChannelRef.key;
}

async function uploadChannelIcon(channelID, image, setError) {
  const channelIconRef = store(storage, `channel_icons/${channelID}`);
  await uploadBytes(channelIconRef, image);
  const channelIconURL = await getDownloadURL(channelIconRef);
  return channelIconURL;
}

async function changeChannelIcon(channelID, imageURL) {
  update(ref(db, `Channels/${channelID}`), { icon: imageURL });
}

function detachListenersForChannel(channelID, uid) {
  const channelInfoRef = ref(db, `Channels/${channelID}`);
  const unreadRoomsRef = ref(db, `users/${uid}/unread_rooms/${channelID}`);

  off(channelInfoRef);
  off(unreadRoomsRef);
}

function getChannelInfo(
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

async function getChannelNames(channelList, updateChannelList) {
  const resultArr = await Promise.all(
    channelList.map((channel) => get(ref(db, `Channels/${channel.id}/name`)))
  );
  updateChannelList(resultArr.map((result) => result.val()));
}

async function getChannelIcons(channelList, updateChannelList) {
  const resultArr = await Promise.all(
    channelList.map((channel) => get(ref(db, `Channels/${channel.id}/icon`)))
  );
  updateChannelList(resultArr.map((result) => result.val()));
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

// async function getUnreadRooms(channelID, userId, roomList, setError) {
// try {

// }
// }

export {
  createChannel,
  uploadChannelIcon,
  changeChannelIcon,
  getChannelInfo,
  getChannelNames,
  getChannelIcons,
  getRoomList,
  createRoomCategory,
  updateCategoryOfRoom,
  createRoom,
  createUserRole,
  updateRoleOfUser,
  detachListenersForChannel,
};
