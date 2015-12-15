import React, { Component, PropTypes } from 'react';

import SVGBase from './svg/base';

export default class OfficeLayoutController extends Component {
  renderChunk(chunk) {
    // TODO swap hardcoding for props and stuff
    return (
      <SVGBase key={`${chunk.name}-chunk`} height="50" width="50">
        <rect height="50" width="50" x="25" y="25" />
      </SVGBase>
    );
  }

  render() {
    const officeLayout = this.props.officeLayout.toJS();

    return (
      <div>
        {officeLayout.map(this.renderChunk)}
      </div>
    );
  }
}

OfficeLayoutController.propTypes = {
  officeLayout: PropTypes.object.isRequired
};
