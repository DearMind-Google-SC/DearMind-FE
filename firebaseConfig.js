import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project-id.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
};

export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();