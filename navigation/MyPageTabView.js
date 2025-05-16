import React, { useState } from 'react';
import MyPageScreen from '../screens/mypage/MyPageScreen';
import SettingScreen from '../screens/mypage/SettingScreen';
import MoodBoosterScreen from '../screens/mypage/MoodBoosterScreen';
import ArchiveHomeScreen from '../screens/archive/ArchiveHomeScreen';

/**
 * navigate: MainTab에서 내려온 setCurrentTab
 */
const MyPageTabView = ({ navigate }) => {
  const [screen, setScreen] = useState('MyPage');

  const goTo = (nextScreen) => {
    if (nextScreen === 'MoodDiary') {
      // MyPageTabView 내부에서 관리하지 않고 MainTab이 화면 전환
      navigate('DiaryFromMain');
    } else if (nextScreen === 'MoodArchive') {
      navigate('Archive'); 
    } else {
      setScreen(nextScreen);
    }
  };

  const goBack = () => {
    setScreen('MyPage');
  };

  switch (screen) {
    case 'MyPage':
      return <MyPageScreen goTo={goTo} />;
    case 'Settings':
      return <SettingScreen goBack={goBack} />;
    case 'MoodBooster':
      return <MoodBoosterScreen goBack={goBack} />;
    default:
      return <MyPageScreen goTo={goTo} />;
  }
};

export default MyPageTabView;
