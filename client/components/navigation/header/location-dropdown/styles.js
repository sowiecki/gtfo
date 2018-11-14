import { css } from 'emotion';

import { colors } from 'components/common/styles';

const stylesGenerator = () => ({
  menuItem: css`
    height: 40px;
    padding: 0 20px;
    width: 200px;
    text-align: right;
    text-transform: uppercase;
    color: ${colors.BLACK};
    overflow: hidden;
  `,

  select: css`
    font-size: 14px;
    color: ${colors.WHITE};

    svg {
      fill: ${colors.WHITE};
    }

    :before,
    :after {
      border-bottom: 2px solid ${colors.WHITE};
    }
  `
});

export default stylesGenerator;
