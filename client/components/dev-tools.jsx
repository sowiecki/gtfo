import React from 'react';

import { createDevTools } from 'redux-devtools';

import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor';
import DiffMonitor from 'redux-devtools-diff-monitor';
import Inspector from 'redux-devtools-inspector';
import Dispatcher from 'redux-devtools-dispatch';

import * as LayoutActions from '../ducks/layout';
import * as NavigationActions from '../ducks/navigation';

const actions = {
  ...LayoutActions,
  ...NavigationActions
};

const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    toggleVisibilityKey='shift-q'
    changePositionKey='shift-w'
    changeMonitorKey='shift-e'>
      <LogMonitor theme='tomorrow'/>
      <SliderMonitor keyboardEnabled/>
      <ChartMonitor keyboardEnabled/>
      <DiffMonitor keyboardEnabled/>
      <Inspector keyboardEnabled/>
      <Dispatcher keyboardEnabled actionCreators={actions}/>
  </DockMonitor>
);

export default DevTools;
