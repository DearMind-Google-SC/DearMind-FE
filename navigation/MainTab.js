// navigation/MainTab.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ArchiveStack from './ArchiveStack';
import DiaryStack from './DiaryStack';
import MainStack from './MainStack';
import CalendarStack from './CalendarStack';
import MyPageStack from './MyPageStack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, color }) => (
  <Icon name={name} size={26} color={color} />
);

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#F26B1F',
        tabBarInactiveTintColor: '#B3B3B3',
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case 'ArchiveStack':
              iconName = 'email-heart-outline';
              break;
            case 'DiaryStack':
              iconName = 'chart-line-variant';
              break;
            case 'MainStack':
              iconName = 'home';
              break;
            case 'CalendarStack':
              iconName = 'calendar-blank-outline';
              break;
            case 'MyPageStack':
              iconName = 'account-circle-outline';
              break;
            default:
              iconName = 'circle';
          }
          return <TabBarIcon name={iconName} color={color} />;
        },
      })}
    >
      <Tab.Screen name="ArchiveStack" component={ArchiveStack} options={{ title: 'Archive' }} />
      <Tab.Screen name="DiaryStack" component={DiaryStack} options={{ title: 'Mood Diary' }} />
      <Tab.Screen name="MainStack" component={MainStack} options={{ title: 'Home' }} />
      <Tab.Screen name="CalendarStack" component={CalendarStack} options={{ title: 'Calendar' }} />
      <Tab.Screen name="MyPageStack" component={MyPageStack} options={{ title: 'My Page' }} />
    </Tab.Navigator>
  );
};

export default MainTab;
