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

function detachListenersForChannel(channelId) {
  const userRolesRef = ref(db, `Channels/${channelId}/user_roles`);
  const roomCategoriesRef = ref(db, `Channels/${channelId}/room_categories`);
  const roomListRef = ref(db, `Channels/${channelId}/rooms`);
  const onlineUsersRef = ref(db, `Channels/${channelId}/online_users`);

  off(userRolesRef);
  off(roomCategoriesRef);
  off(roomListRef);
  off(onlineUsersRef);
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
    console.log(error);
    //setError(error);
  }
}

async function getRoomList(channelId, setRoomList) {
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

async function getRoomCategories(channelId, setRoomCategories, setError) {
  try {
    const roomCategoriesRef = ref(db, `Channels/${channelId}/room_categories`);

    onValue(roomCategoriesRef, (snap) => {
      const data = snap.val();
    });
  } catch (error) {
    console.log(error);
  }
}

async function createRoomCategory(channelId, name, setError) {
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
  try {
    const channelRoomRef = ref(db, `Channels/${channelId}/rooms/${roomId}`);
    update(channelRoomRef, { category });
  } catch (error) {
    console.log(error);
  }
}

async function getOnlineUsers(channelId, setUserList) {
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

async function createUserRole(channelId, role, setError) {
  try {
    const channelUserRolesRef = ref(db, `Channels/${channelId}/user_roles`);
    const newRoleRef = push(channelUserRolesRef);
    set(newRoleRef, { role });
  } catch (error) {
    console.log(error);
  }
}

async function getUserRoles(channelId, setUserRoles, setError) {
  try {
    const channelUserRolesRef = ref(db, `Channels/${channelId}/user_roles`);

    onValue(channelUserRolesRef, (snap) => {
      const data = snap.val();

      setUserRoles(data);
    });
  } catch (error) {
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
    console.log(error);
  }
}

async function updateRoleOfUser(channelId, userId, role, setError) {
  console.log(userId);
  try {
    let updates = {};
    updates[`users/${userId}/channels/${channelId}`] = role;
    if (isUserOnline(userId))
      updates[`Channels/${channelId}/online_users/${userId}/role`] = role;

    update(ref(db), updates);
  } catch (error) {
    console.log(error);
  }
}

export {
  getRoomCategories,
  createRoomCategory,
  updateRoomCateogry,
  getRoomList,
  createRoom,
  getOnlineUsers,
  getUserRoles,
  getRoleOfUser,
  createUserRole,
  updateRoleOfUser,
  detachListenersForChannel,
};
