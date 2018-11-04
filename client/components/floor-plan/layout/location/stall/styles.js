import { css } from 'emotion';

import { colors } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    stroke: ${colors.GHOST_WHITE};
    strokewidth: 1;
  `
});

export default stylesGenerator;
