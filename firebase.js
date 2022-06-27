import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA-ENIyaobZyeWCjLupcynLVDrNvUW9M9I',
  authDomain: 'finleo-354408.firebaseapp.com',
  projectId: 'finleo-354408',
  storageBucket: 'finleo-354408.appspot.com',
  messagingSenderId: '570103716430',
  appId: '1:570103716430:web:26bf76d6ab907b0379c11f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, storage };
