import React from 'react';

import { createDevTools } from 'redux-devtools';

import DockMonitor from 'redux-devtools-dock-monitor';
// import Inspector from 'redux-devtools-inspector';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor';
import DiffMonitor from 'redux-devtools-diff-monitor';
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
      {/*
        TODO: Re-enable once Inspector is updated with latest React version support
        <Inspector theme='tomorrow' supportImmutable/>
      */}
      <SliderMonitor keyboardEnabled/>
      <Dispatcher keyboardEnabled actionCreators={actions}/>
      <LogMonitor theme='tomorrow'/>
      <ChartMonitor keyboardEnabled/>
      <DiffMonitor keyboardEnabled/>
  </DockMonitor>
);

export default DevTools;
