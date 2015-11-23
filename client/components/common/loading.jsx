import React from 'react';

import { CircularProgress } from 'material-ui/lib';

export default class Loading extends React.Component {
  render() {
    return (
      <div className='loading-container'>
        <CircularProgress mode='indeterminate'/>
      </div>
    );
  }
}
