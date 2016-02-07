/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';

import history from './config/history';
import configureStore from './store/configure-store';

import Body from './components/body';
import RoomsContainer from './components/rooms/container';

const store = configureStore();
const node = document.getElementById('root');

const Application = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Body}>
        <IndexRoute component={RoomsContainer}/>
        <Route path=':markerLocation' component={RoomsContainer}/>
      </Route>
      <Route path='/map' component={RoomsContainer}/>
    </Router>
  </Provider>
);

// Initialze client
ReactDOM.render(Application, node);
