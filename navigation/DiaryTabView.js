import React, { useState } from 'react';
import DiarySplashScreen from '../screens/diary/DiarySplashScreen';
import DrawingScreen from '../screens/diary/DrawingScreen';
import LoadingScreen from '../screens/diary/LoadingScreen';
import AnalysisResultScreen from '../screens/diary/AnalysisResultScreen';
import RecommendationScreen from '../screens/diary/RecommendationScreen';
import EmotionSelectScreen from '../screens/diary/EmotionSelectScreen';

const DiaryTabView = ({ entry = 'default', exitDiary }) => {
  const [screen, setScreen] = useState(() =>
    entry === 'fromMain' ? 'Drawing' : 'Splash'
  );
  const [screenProps, setScreenProps] = useState({});

  const goTo = (nextScreen, props = {}) => {
    setScreen(nextScreen);
    setScreenProps(props);
  };

  switch (screen) {
    case 'Splash':
      return <DiarySplashScreen goTo={goTo} />;
    case 'Drawing':
      return <DrawingScreen goTo={goTo} exitDiary={exitDiary} {...screenProps} />;
    case 'Loading':
      return <LoadingScreen goTo={goTo} {...screenProps} />;
    case 'Result':
      return <AnalysisResultScreen goTo={goTo} {...screenProps} />;
    case 'Recommend':
      return <RecommendationScreen goTo={goTo} exitDiary={exitDiary} {...screenProps} />;
    case 'EmotionSelect':
      return (
        <EmotionSelectScreen
          goTo={goTo}
          recordId={screenProps.recordId}
          exitDiary={exitDiary}
        />
      );
    default:
      return <DiarySplashScreen goTo={goTo} />;
  }
};

export default DiaryTabView;

