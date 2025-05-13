// navigation/Root.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useAuthStore from '../store/useAuthStore';
import MainTab from './MainTab';
import AuthStack from './AuthStack';

const Root = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log('[Root] isLoggedIn:', isLoggedIn);
  return isLoggedIn ? <MainTab /> : <AuthStack />;
};

export default Root;
