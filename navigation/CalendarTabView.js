import React, { useState } from 'react';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import CalendarChartScreen from '../screens/calendar/CalendarChartScreen';

const CalendarTabView = () => {
  const [screen, setScreen] = useState<'Calendar' | 'Chart'>('Calendar');

  switch (screen) {
    case 'Calendar':
      return <CalendarScreen goTo={setScreen} />;
    case 'Chart':
      return <CalendarChartScreen goBack={() => setScreen('Calendar')} />;
    default:
      return <CalendarScreen goTo={setScreen} />;
  }
};

export default CalendarTabView;
