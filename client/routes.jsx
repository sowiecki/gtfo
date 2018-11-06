import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import history from 'config/history';
import Body from 'components/body';
import FloorPlanController from 'components/floor-plan/container';
import { FLOOR_PLAN_ROUTE } from 'client/constants';
import store from './store';

const Routes = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Body location={history.location}>
        <Route component={FloorPlanController} />
        <Route path={FLOOR_PLAN_ROUTE} component={FloorPlanController} />
      </Body>
    </ConnectedRouter>
  </Provider>
);

export default Routes;
