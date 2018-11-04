import { css } from 'emotion';

const stylesGenerator = () => ({
  swipableOverride: css`
    overflow: hidden;
    height: 100%;
    width: 100%;
  `
});

export default stylesGenerator;
