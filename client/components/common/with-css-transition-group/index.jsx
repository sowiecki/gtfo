import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const withCSSTransitionGroup = (renderNode, shouldRender, transitionName = 'generic') => (
  <ReactCSSTransitionGroup
    transitionName={transitionName}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}>
    {shouldRender ? renderNode() : null}
  </ReactCSSTransitionGroup>
);

export default withCSSTransitionGroup;
