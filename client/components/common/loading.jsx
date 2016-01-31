import React from 'react';

import { CircularProgress } from 'material-ui/lib';

import styles from './styles';

export default class Loading extends React.Component {
  render() {
    return (
      <div style={styles.loadingContainer}>
        <CircularProgress size={5} color={styles.progressColor} mode='indeterminate'/>
      </div>
    );
  }
}
