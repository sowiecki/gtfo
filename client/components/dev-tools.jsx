import React from 'react';

import { createDevTools } from 'redux-devtools';

import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-q'
    changePositionKey='ctrl-w'
    changeMonitorKey='ctrl-e'>
      <LogMonitor theme='tomorrow'/>
      <SliderMonitor keyboardEnabled/>
  </DockMonitor>
);

export default DevTools;
