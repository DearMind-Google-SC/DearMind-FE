// firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCLAJqrmpJLkFdWLlVOIwJj-tX3kYMScas",
  authDomain: "dearmind-dd9c5.firebaseapp.com",
  projectId: "dearmind-dd9c5",
  storageBucket: "dearmind-dd9c5.appspot.com",
  messagingSenderId: "18062658597",
  appId: "1:18062658597:android:f78af52749270ebfcd83cc"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ 반드시 필요! (React Native에서는 자동으로 안 됨)
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firebaseApp = app;
