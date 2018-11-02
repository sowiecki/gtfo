import { css } from 'emotion';

import { colors } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    margin: 40px 20px 40px 0;
    pointer-events: all;
    i {
      color: ${colors.WHITE};
    }
  `
});

export default stylesGenerator;
