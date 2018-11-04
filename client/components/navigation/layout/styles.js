import { css } from 'emotion';

const stylesGenerator = () => ({
  drawer: css`
    pointer-events: none;

    > div:nth-child(1) {
      display: none;
    }

    div:nth-child(2) {
      pointer-events: all;
      top: 48px;
    }
  `
});

export default stylesGenerator;
