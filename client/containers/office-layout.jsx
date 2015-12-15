import React, { Component, PropTypes } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OfficeLayoutController from '../components/office-layout/controller';
import Loading from '../components/common/loading';

import * as OfficeLayoutActions from '../ducks/office-layout';

class OfficeLayoutContainer extends Component {
  constructor(props) {
    super(props);

    this.hasOfficeLayoutData = this.hasOfficeLayoutData.bind(this);
  }

  componentWillMount() {
    const { buildOfficeLayout } = this.props.actions;

    buildOfficeLayout();
  }

  hasOfficeLayoutData() {
    const { officeLayout } = this.props;

    return officeLayout && officeLayout.size;
  }

  renderOfficeLayout() {
    return (
      <OfficeLayoutController {...this.props}/>
    );
  }

  renderLoading() {
    return (
      <Loading/>
    );
  }

  render() {
    const loading = !this.hasOfficeLayoutData() ? this.renderLoading() : null;
    const content = this.hasOfficeLayoutData() ? this.renderOfficeLayout() : null;

    return (
      <div>
        <ReactCSSTransition
          transitionName='root-container'
          transitionEnterTimeout={3000}
          transitionLeaveTimeout={3000}>
            {loading}
        </ReactCSSTransition>
        {content}
      </div>
    );
  }
}

OfficeLayoutContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  officeLayout: PropTypes.object
};

const mapStateToProps = ({ officeLayout }) => ({ officeLayout });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(OfficeLayoutActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficeLayoutContainer);
