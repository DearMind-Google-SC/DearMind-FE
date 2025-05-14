import React, { useState } from 'react';
import DiarySplashScreen from '../screens/diary/DiarySplashScreen';
import DrawingScreen from '../screens/diary/DrawingScreen';
import LoadingScreen from '../screens/diary/LoadingScreen';
import AnalysisResultScreen from '../screens/diary/AnalysisResultScreen';
import RecommendationScreen from '../screens/diary/RecommendationScreen';
import EmotionSelectScreen from '../screens/diary/EmotionSelectScreen';

const DiaryTabView = ({ entry = 'default' }) => {
  const [screen, setScreen] = useState(() =>
    entry === 'fromMain' ? 'Drawing' : 'Splash'
  );

  switch (screen) {
    case 'Splash':
      return <DiarySplashScreen goTo={setScreen} />;
    case 'Drawing':
      return <DrawingScreen goTo={setScreen} />;
    case 'Loading':
      return <LoadingScreen goTo={setScreen} />;
    case 'Result':
      return <AnalysisResultScreen goTo={setScreen} />;
    case 'Recommend':
      return <RecommendationScreen goTo={setScreen} />;
    case 'EmotionSelect':
      return <EmotionSelectScreen goTo={setScreen} />;
    default:
      return <DiarySplashScreen goTo={setScreen} />;
  }
};

export default DiaryTabView;