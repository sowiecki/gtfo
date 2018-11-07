import React, { PureComponent } from 'react';
import { matchPath } from 'react-router';

import { FLOOR_PLAN_ROUTE } from 'client/constants';

const withModal = (WrappedComponent) =>
  class ComponentWithModal extends PureComponent {
    getLocationParams = () =>
      matchPath(this.props.location.pathname, {
        path: FLOOR_PLAN_ROUTE,
        exact: true,
        strict: false
      }).params;

    closeModal = () => {
      const { actions } = this.props;
      const params = this.getLocationParams();

      actions.emitModalContentUpdate(null);
      actions.push(`/${params.location}`);
    };

    getMeetingRoom = (nextProps = this.props) => {
      const { meetingRooms, getLocationParams } = nextProps;

      return find(meetingRooms, { id: getLocationParams().room });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getLocationParams={this.getLocationParams}
          closeModal={this.closeModal}/>
      );
    }
  };

export default withModal;
