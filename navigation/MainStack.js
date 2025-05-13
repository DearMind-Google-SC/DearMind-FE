import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../screens/main/MainScreen';
import DrawingScreen from '../screens/diary/DrawingScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import ArchiveHomeScreen from '../screens/archive/ArchiveHomeScreen';
import LoadingScreen from '../screens/diary/LoadingScreen';
import AnalysisResultScreen from '../screens/diary/AnalysisResultScreen';
import RecommendationScreen from '../screens/diary/RecommendationScreen';
import EmotionSelectScreen from '../screens/diary/EmotionSelectScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="DrawingScreen" component={DrawingScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ArchiveHomeScreen" component={ArchiveHomeScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="AnalysisResultScreen" component={AnalysisResultScreen} />
      <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} />
      <Stack.Screen name="EmotionSelectScreen" component={EmotionSelectScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
