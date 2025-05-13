import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import CalendarChartScreen from '../screens/calendar/CalendarChartScreen';

const Stack = createNativeStackNavigator(); // 타입 지정 안 해도 문제 없음

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalendarChartScreen"
        component={CalendarChartScreen}
        options={{ title: '월간 감정 통계' }}
      />
    </Stack.Navigator>
  );
}
export default CalendarStack