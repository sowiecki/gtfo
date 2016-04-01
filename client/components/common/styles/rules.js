import transitions from './transitions';
import { colors } from './base';

export const rules = {
  body: {
    'html, body, #root, #root > div': {
      margin: '0',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      textAlign: 'center',
      backgroundColor: colors.GHOST_WHITE
    },

    ...transitions
  },

  '*': {
    boxSizing: 'border-box'
  }
};
