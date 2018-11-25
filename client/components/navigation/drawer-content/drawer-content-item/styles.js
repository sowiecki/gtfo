import { css } from 'emotion';

import { colors } from 'components/common/styles/base';

const stylesGenerator = ({ enabled }) => ({
  base: css`
    opacity: ${enabled ? 1 : 0.5};

    p {
      color: ${colors.LIGHT_GREY};
    }
  `
});

export default stylesGenerator;
