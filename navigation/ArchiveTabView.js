import React, { useState } from 'react';
import ArchiveHomeScreen from '../screens/archive/ArchiveHomeScreen';
import DiaryDetailScreen from '../screens/archive/DiaryDetailScreen';
import ReplyDetailScreen from '../screens/archive/ReplyDetailScreen';

const ArchiveTabView = () => {
  const [screen, setScreen] = useState('Home');
  const [selectedId, setSelectedId] = useState(null);

  const goTo = (target, id = null) => {
    setSelectedId(id);
    setScreen(target);
  };

  switch (screen) {
    case 'Home':
      return <ArchiveHomeScreen goTo={goTo} />;
    case 'DiaryDetail':
      return <DiaryDetailScreen id={selectedId} goBack={() => setScreen('Home')} />;
    case 'ReplyDetail':
      return <ReplyDetailScreen id={selectedId} goBack={() => setScreen('Home')} />;
    default:
      return <ArchiveHomeScreen goTo={goTo} />;
  }
};

export default ArchiveTabView;
