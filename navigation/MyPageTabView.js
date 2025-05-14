import React, { useState } from 'react';
import MyPageScreen from '../screens/mypage/MyPageScreen';
import SettingScreen from '../screens/mypage/SettingScreen';

const MyPageTabView = () => {
  const [screen, setScreen] = useState<'MyPage' | 'Settings'>('MyPage');

  switch (screen) {
    case 'MyPage':
      return <MyPageScreen goTo={setScreen} />;
    case 'Settings':
      return <SettingsScreen goBack={() => setScreen('MyPage')} />;
    default:
      return <MyPageScreen goTo={setScreen} />;
  }
};

export default MyPageTabView;
