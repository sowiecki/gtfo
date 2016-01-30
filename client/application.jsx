/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import configureStore from './store/configure-store';

import Body from './components/body';
import RoomsContainer from './components/rooms/container';

require('./styles/base.scss');

const store = configureStore();
const node = document.getElementById('root');

const history = createBrowserHistory();

const Application = (
  <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Body}>
          <IndexRoute component={RoomsContainer}/>
        </Route>
      </Router>
  </Provider>
);

// Initialze client
ReactDOM.render(Application, node);
