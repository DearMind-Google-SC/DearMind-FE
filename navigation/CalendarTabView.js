import React, { useState } from 'react';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import CalendarChartScreen from '../screens/calendar/CalendarChartScreen';

const CalendarTabView = () => {
  const [screen, setScreen] = useState('Calendar');

  const goTo = (nextScreen) => {
    setScreen(nextScreen);
  };

  const goBack = () => {
    setScreen('Calendar');
  };

  switch (screen) {
    case 'Calendar':
      return <CalendarScreen goTo={goTo} />;
    case 'Chart':
      return <CalendarChartScreen goBack={goBack} />;
    default:
      return <CalendarScreen goTo={goTo} />;
  }
};

export default CalendarTabView;
