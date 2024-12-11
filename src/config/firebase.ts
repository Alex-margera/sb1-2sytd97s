import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBEt-0Aqcpl3Hrf6VdjGBMkqrMO6lpu_iw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "desirediariesbot.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "desirediariesbot",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "desirediariesbot.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "850004642565",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:850004642565:web:c877719ecda60e6731456c"
};

let storage;

try {
  const app = initializeApp(firebaseConfig);
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

export { storage };