import { css } from 'emotion';

import { colors } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    margin: 40px 0;
    pointer-events: all;

    i {
      color: ${colors.BLACK};
    }
  `
});

export default stylesGenerator;
