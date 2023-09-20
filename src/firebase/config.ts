import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDbBaeTO05-rM82SdK07fQP4x9Kd5uvgk4',
  authDomain: 'muso-ninjas-610cd.firebaseapp.com',
  projectId: 'muso-ninjas-610cd',
  storageBucket: 'muso-ninjas-610cd.appspot.com',
  messagingSenderId: '11324743213',
  appId: '1:11324743213:web:55c3da7a3f73b8c0f122a4',
  measurementId: 'G-JXT7CYNENH',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
