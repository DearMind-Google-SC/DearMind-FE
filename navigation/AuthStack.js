import React, { useState } from 'react';
import { View } from 'react-native';
import SplashScreen from '../screens/auth/SplashScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';

/** @type {[ScreenName, (screen: ScreenName) => void]} */


const AuthStack = () => {
  const [currentScreen, setCurrentScreen] = useState('Splash');

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen navigate={navigate} />;
      case 'SignUp':
        return <SignUpScreen navigate={navigate} />;
      case 'Login':
        return <LoginScreen navigate={navigate} />;
      default:
        return null;
    }
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
};

export default AuthStack;