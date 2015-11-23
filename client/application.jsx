/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import configureStore from './store/configure-store';

// Containers
import Body from './containers/body';

require('./styles/base.scss');

const store = configureStore();
const node = document.getElementById('root');

const history = createBrowserHistory();

const Application = (
  <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Body}>
          {/* Routes go here */}
        </Route>
      </Router>
  </Provider>
);

// Initialze client
ReactDOM.render(Application, node);
