import { initializeApp } from 'firebase/app';
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

async function createUser(email, password, displayName, setUser, setError) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    updateProfile(userCredential.user, { displayName });
    setUser(userCredential.user);
  } catch (error) {
    setError(error.code);
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
    console.log(userCredential);
    setUser(userCredential.user);
  } catch (error) {
    setError(error.code);
  }
}

export { createUser, signIn };
