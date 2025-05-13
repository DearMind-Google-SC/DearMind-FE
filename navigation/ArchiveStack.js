import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArchiveHomeScreen from '../screens/archive/ArchiveHomeScreen';
import DiaryDetailScreen from '../screens/archive/DiaryDetailScreen';
import ReplyDetailScreen from '../screens/archive/ReplyDetailScreen';

const Stack = createNativeStackNavigator();

const ArchiveStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArchiveHomeScreen"
        component={ArchiveHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiaryDetailScreen"
        component={DiaryDetailScreen}
        options={{ title: '일기 상세 보기' }}
      />
      <Stack.Screen
        name="ReplyDetailScreen"
        component={ReplyDetailScreen}
        options={{ title: 'AI 응답 보기' }}
      />
    </Stack.Navigator>
  );
};

export default ArchiveStack;
