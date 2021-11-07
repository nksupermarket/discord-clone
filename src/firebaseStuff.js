import { initializeApp } from 'firebase/app';
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

const firebaseConfig = {
  apiKey: 'AIzaSyC8GZMfCxqOUIFsa2OYlXcMzfQKfAobukQ',

  authDomain: 'bread-8adf4.firebaseapp.com',

  databaseURL: 'https://bread-8adf4-default-rtdb.firebaseio.com',

  projectId: 'bread-8adf4',

  storageBucket: 'bread-8adf4.appspot.com',

  messagingSenderId: '163895954776',

  appId: '1:163895954776:web:81bdb5187f320d28a4692d',
};

initializeApp(firebaseConfig);
const db = getDatabase();

async function createChannel(name) {
  try {
    const db = getDatabase();
    const channelListRef = ref(db, 'Channels');
    const newChannelRef = push(channelListRef);
    await set(newChannelRef, { name });
    return newChannelRef.key;
  } catch (error) {
    console.log(error);
  }
}

export { db, createChannel };

//login user
// pull Channels user is subscribed to
// can pull all the rooms too

// when user clicks on a room, pull messages
