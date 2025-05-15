import React, { useState } from 'react';
import ArchiveHomeScreen from '../screens/archive/ArchiveHomeScreen';
import DiaryDetailScreen from '../screens/archive/DiaryDetailScreen';
import ReplyDetailScreen from '../screens/archive/ReplyDetailScreen';

const ArchiveTabView = () => {
  const [screen, setScreen] = useState('Home');


  switch (screen) {
    case 'Home':
      return <ArchiveHomeScreen goTo={setScreen} />;
    case 'DiaryDetail':
      return <DiaryDetailScreen goBack={() => setScreen('Home')} />;
    case 'ReplyDetail':
      return <ReplyDetailScreen goBack={() => setScreen('Home')} />;
    default:
      return <ArchiveHomeScreen goTo={setScreen} />;
  }
};

export default ArchiveTabView;
