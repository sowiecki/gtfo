import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css``,

  locationHighlight: css`
    height: 24px;
    width: 24px;
    x: 24px;
    y: 0;
  `,

  placeMarker: css`
    > path {
      fill: ${colors.secondary};
      transform: scale(0.05);
    }
  `,

  text: css`
    font-size 12px;
    font-weight: bold;
    transform: translateY(-24px);
    font-ize: 24px;
    font-family: ${fonts.tertiary};
  `
});

export default stylesGenerator;
