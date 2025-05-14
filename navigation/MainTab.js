import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import MainScreen from '../screens/main/MainScreen';
import ArchiveTabView from './ArchiveTabView';
import CalendarTabView from './CalendarTabView';
import DiaryTabView from './DiaryTabView';
import MyPageTabView from './MyPageTabView';
import BottomTabBar from './BottomTabBar';
import ChatScreen from '../screens/chat/ChatScreen';

const MainTab = () => {
  const [currentTab, setCurrentTab] = useState('Main');

  const renderTab = () => {
    switch (currentTab) {
      case 'Main':
        return <MainScreen navigate={setCurrentTab} />;
      case 'Archive':
        return <ArchiveTabView />;
      case 'Calendar':
        return <CalendarTabView />;
      case 'Diary':
        return <DiaryTabView entry="default" />;
      case 'DiaryFromMain':
        return <DiaryTabView entry="fromMain" />;
      case 'MyPage':
        return <MyPageTabView />;
      case 'Chat':
        return <ChatScreen goBack={() => setCurrentTab('Main')} />;
      default:
        return <MainScreen navigate={setCurrentTab} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderTab()}
      <BottomTabBar
        currentTab={currentTab === 'DiaryFromMain' ? 'Diary' : currentTab}
        onTabPress={setCurrentTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainTab;