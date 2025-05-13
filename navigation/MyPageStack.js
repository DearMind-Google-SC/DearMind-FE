import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPageScreen from '../screens/mypage/MyPageScreen';

const Stack = createNativeStackNavigator();

const MyPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: '환경 설정' }}
      />
    </Stack.Navigator>
  );
};

export default MyPageStack;
