/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import history from './config/history';
import store from './store/store';

import Body from './components/body';
import LayoutContainer from './components/layout/container';

require('velocity-animate');
require('velocity-animate/velocity.ui');

injectTapEventPlugin();

const node = document.getElementById('root');

const Application = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Body}>
        <IndexRoute component={LayoutContainer}/>
        <Route path=':location' component={LayoutContainer}/>
        <Route path=':location/anchor/:id' component={LayoutContainer}/>
      </Route>
    </Router>
  </Provider>
);

// Initialze client
ReactDOM.render(Application, node);
