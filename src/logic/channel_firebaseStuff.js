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
  onDisconnect,
} from 'firebase/database';
import { db } from '../firebaseStuff';
import { isUserOnline } from './user_firebaseStuff';

function detachListenersForChannel(channelId, uid) {
  const userRolesRef = ref(db, `Channels/${channelId}/user_roles`);
  const roomCategoriesRef = ref(db, `Channels/${channelId}/room_categories`);
  const roomListRef = ref(db, `Channels/${channelId}/rooms`);
  const unreadRoomsRef = ref(db, `users/${uid}/unread_rooms/${channelId}`);
  const onlineUsersRef = ref(db, `Channels/${channelId}/online_users`);

  off(unreadRoomsRef);
  off(userRolesRef);
  off(roomCategoriesRef);
  off(roomListRef);
  off(onlineUsersRef);
}

async function getChannelName(id, setError) {
  try {
    const channelNameRef = ref(db, `Channels/${id}/name`);

    const data = await get(channelNameRef);

    return data.val();
  } catch (error) {
    setError && setError(error);
  }
}

async function createRoom(channelId, name, setError) {
  try {
    const channelRoomListRef = ref(db, `Channels/${channelId}/rooms`);
    const newRoomRef = push(channelRoomListRef);
    set(newRoomRef, { name });

    set(ref(db, `Rooms/${newRoomRef.key}`), {
      name,
    });
  } catch (error) {
    setError && setError(error);
    console.log(error);
  }
}

function getRoomList(channelId, setRoomList) {
  const roomsRef = ref(db, `Channels/${channelId}/rooms`);

  onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();

    let roomList = [];
    for (const id in data) {
      roomList.push({ ...data[id], id });
    }
    setRoomList(roomList);
  });
}

async function getUnreadRooms(uid, channelId, setUnreadRooms, setError) {
  try {
    const unreadRoomsRef = ref(db, `users/${uid}/unread_rooms/${channelId}`);

    onValue(unreadRoomsRef, (snap) => {
      const data = snap.val();
      if (!data) return setUnreadRooms([]);

      const unreadRooms = Object.keys(data);

      setUnreadRooms(unreadRooms);
    });
  } catch (error) {
    setError && setError(error);
  }
}

function getRoomCategories(channelId, setRoomCategories, setError) {
  try {
    const roomCategoriesRef = ref(db, `Channels/${channelId}/room_categories`);
    onValue(roomCategoriesRef, (snap) => {
      const data = snap.val();
      const roomCategories = typeof data === 'object' ? Object.keys(data) : {};
      setRoomCategories(['none', ...roomCategories]);
    });
  } catch (error) {
    setError && setError(error);
    console.log(error);
  }
}

function createRoomCategory(channelId, name, setError) {
  try {
    const channelRoomCategoriesRef = ref(
      db,
      `Channels/${channelId}/room_categories`
    );
    update(channelRoomCategoriesRef, { [name]: true });
  } catch (error) {
    setError && setError(error);
    console.log(error);
  }
}

function updateCategoryOfRoom(channelId, roomId, category, setError) {
  try {
    const channelRoomRef = ref(db, `Channels/${channelId}/rooms/${roomId}`);
    update(channelRoomRef, { category });
  } catch (error) {
    setError && setError(error);
    console.log(error);
  }
}

async function getOnlineUsers(channelId, setUserList, setError) {
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
    setError && setError(error);
    console.log(error);
  }
}

async function createUserRole(channelId, role, setError) {
  try {
    const channelUserRolesRef = ref(db, `Channels/${channelId}/user_roles`);
    /* const newRoleRef = push(channelUserRolesRef);
    set(newRoleRef, { role }); */

    update(channelUserRolesRef, { [role]: true });
  } catch (error) {
    setError && setError(error);
    console.log(error);
  }
}

async function getUserRoles(channelId, setUserRoles, setError) {
  try {
    const channelUserRolesRef = ref(db, `Channels/${channelId}/user_roles`);

    onValue(channelUserRolesRef, (snap) => {
      const data = snap.val();
      const userRoles = Object.keys(data);

      setUserRoles([...userRoles, 'Online']);
    });
  } catch (error) {
    setError && setError(error);
    console.log(error);
  }
}

async function getRoleOfUser(channelId, userId, setRole, setError) {
  try {
    const userRoleRef = ref(db, `users/${userId}/channels/${channelId}`);
    onValue(userRoleRef, (snap) => {
      const data = snap.val();

      setRole(data);
    });
  } catch (error) {
    setError && setError(error);
    console.log(error);
  }
}

async function updateRoleOfUser(channelId, userId, role, setError) {
  try {
    let updates = {};
    updates[`users/${userId}/channels/${channelId}`] = role;
    if (isUserOnline(userId))
      updates[`Channels/${channelId}/online_users/${userId}/role`] = role;

    update(ref(db), updates);
  } catch (error) {
    setError && setError(error);
  }
}

// async function getUnreadRooms(channelId, userId, roomList, setError) {
// try {

// }
// }

export {
  getChannelName,
  getRoomCategories,
  createRoomCategory,
  updateCategoryOfRoom,
  getUnreadRooms,
  getRoomList,
  createRoom,
  getOnlineUsers,
  getUserRoles,
  getRoleOfUser,
  createUserRole,
  updateRoleOfUser,
  detachListenersForChannel,
};
