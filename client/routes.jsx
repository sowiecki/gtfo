import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import history from 'config/history';
import Body from 'components/body';
import FloorPlanController from 'components/floor-plan/container';
import { FLOOR_PLAN_ROUTE } from 'client/constants';
import store from './store';

const Routes = ({ oauthResponse }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Body oauthResponse={oauthResponse} location={history.location}>
        <Route component={FloorPlanController} />
        <Route path={FLOOR_PLAN_ROUTE} component={FloorPlanController} />
      </Body>
    </ConnectedRouter>
  </Provider>
);

Routes.propTypes = {
  oauthResponse: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
    expiresOn: PropTypes.string.isRequired
  })
};

export default Routes;
