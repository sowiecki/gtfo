import React from 'react';

import { CircularProgress } from 'material-ui/lib';

import { base } from '../../config/composition';
import { styles } from './styles';

const Loading = () => (
  <div style={styles.loadingContainer}>
    <CircularProgress
      size={styles.progressSize}
      color={styles.progressColor}
      mode='indeterminate'/>
  </div>
);

export default base(Loading);
