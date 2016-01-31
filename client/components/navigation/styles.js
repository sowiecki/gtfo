import { colors } from '../common/styles';

const { WHITE } = colors;

export default {
  appBar: {
    position: 'absolute'
  },

  appTitle: {
    fontSize: '50px',
    fontWeight: '8',
    fontFamily: `'Wire One', sans-serif`,
    '@media (minWidth: 765px)': {
      fontSize: '80px'
    }
  },

  menuButton: {
    color: WHITE
  },

  navIcons: {
    marginLeft: '24'
  }
};
