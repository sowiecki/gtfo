import { css } from 'emotion';

import { colors } from 'components/common/styles';

const stylesGenerator = () => ({
  swipableOverride: css`
    overflow: hidden;
    height: 100%;
    width: 100%;
    background-color: ${colors.BLACK};
  `
});

export default stylesGenerator;
