import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    color: ${colors.WHITE};
    font-size: 36px;
    font-family: ${fonts.secondary};

    > div {
      border-radius: 0;
    }
  `
});

export default stylesGenerator;
