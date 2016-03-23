import React from 'react';

import { createDevTools } from 'redux-devtools';

import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-q'
    changePositionKey='ctrl-w'
    changeMonitorKey='ctrl-e'>
      <LogMonitor theme='tomorrow'/>
      <SliderMonitor keyboardEnabled/>
      <ChartMonitor keyboardEnabled/>
  </DockMonitor>
);

/**
 * Do not use ES6 module export here,
 * must be CommonJS so that it can be conditionally required.
 */
module.exports = DevTools;
