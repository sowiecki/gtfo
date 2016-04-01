const transitions = {
  '.root-container-enter': {
    position: 'absolute',
    opacity: '0.01'
  },

  '.root-container-enter.root-container-enter-active': {
    opacity: '1',
    transition: 'opacity 100ms ease-in'
  },

  '.root-container-leave': {
    position: 'absolute',
    opacity: '1'
  },

  '.root-container-leave.root-container-leave-active': {
    position: 'absolute',
    opacity: '0.01',
    transition: 'opacity 200ms ease-in'
  }
};

export default transitions;
