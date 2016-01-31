export const colors = {
  primary: '',
  secondary: '',
  primaryOpposing: '#FFAE00',
  secondaryOpposing: '',
  WHITE: '#FFFFFF',
  GREY: '#888899',
  BLACK: '#333333',
  PURPLE: '#551A8B',
  BLUE: '#3399FF',
  TEAL: '#217C7E',
  DARK_PINK: '#FF0066',
  RED: '#FF0000',
  GREEN: '#72E837',
  ORANGE: '#FF2500'
};

export default {
  // Used to override element styles on dark backgrounds
  lightOnDark: {
    color: colors.WHITE
  },

  loadingContainer: {
    zIndex: 200,
    position: 'absolute',
    top: '25%',
    height: '50%',
    width: '100%',
    textAlign: 'center'
  },

  progressColor: colors.primaryOpposing
};
