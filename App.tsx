import './firebaseConfig'; 
import React, {useEffect} from 'react';
import { Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
// import AuthStack from './navigation/AuthStack';
// import SignUpScreen from './screens/auth/SignUpScreen';
// import SplashScreen from './screens/auth/SplashScreen';
// import LoginScreen from './screens/auth/LoginScreen';
// import MainScreen from './screens/main/MainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  useEffect(() => {
    const defaultFont = {
      style: { fontFamily: 'Pretendard-Regular' },
    };

    // ✅ Text에 기본 적용
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.style = [Text.defaultProps.style, defaultFont.style];

    // ✅ TextInput에도 기본 적용 (선택적)
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.style = [TextInput.defaultProps.style, defaultFont.style];
  }, []);
  return (
    <NavigationContainer>
        <Root />
    </NavigationContainer>
  );
}

export default App;
