/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';

import history from './config/history';
import configureStore from './store/configure-store';

import Body from './components/body';
import LayoutContainer from './components/layout/container';

const store = configureStore();
const node = document.getElementById('root');

const Application = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Body}>
        <IndexRoute component={LayoutContainer}/>
        <Route path=':location' component={LayoutContainer}/>
        <Route path=':location/anchor/:id' component={LayoutContainer}/>
        <Route path=':location/fullscreen' component={LayoutContainer}/>
      </Route>
    </Router>
  </Provider>
);

// Initialze client
ReactDOM.render(Application, node);
