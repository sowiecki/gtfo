export default () => (next) => (action) => {
  switch (action.type) {
    default:
      next({ type: action.type });
      break;
  }
};
