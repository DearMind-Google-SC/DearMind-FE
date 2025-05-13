import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiarySplashScreen from '../screens/diary/DiarySplashScreen';
import DrawingScreen from '../screens/diary/DrawingScreen';
import LoadingScreen from '../screens/diary/LoadingScreen';
import AnalysisResultScreen from '../screens/diary/AnalysisResultScreen';
import RecommendationScreen from '../screens/diary/RecommendationScreen';
import EmotionSelectScreen from '../screens/diary/EmotionSelectScreen';

const Stack = createNativeStackNavigator();

const DiaryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="DiarySplashScreen"
        component={DiarySplashScreen}
      />
      <Stack.Screen
        name="DrawingScreen"
        component={DrawingScreen}
      />
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        name="AnalysisResultScreen"
        component={AnalysisResultScreen}
      />
      <Stack.Screen
        name="RecommendationScreen"
        component={RecommendationScreen}
      />
      <Stack.Screen
        name="EmotionSelectScreen"
        component={EmotionSelectScreen}
      />
    </Stack.Navigator>
  );
};

export default DiaryStack;
