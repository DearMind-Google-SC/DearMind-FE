// navigation/Root.js
import React from 'react';
import useAuthStore from '../store/useAuthStore';
import MainTab from './MainTab';
import AuthStack from './AuthStack';

const Root = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log(isLoggedIn ? 'Rendering MainTab' : 'Rendering AuthStack');
  return isLoggedIn ? <MainTab /> : <AuthStack />;
};

export default Root;
