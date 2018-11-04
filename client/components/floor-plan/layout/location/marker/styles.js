import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles';

const stylesGenerator = () => ({
  locationHighlight: css`
    height: 24px;
    width: 24px;
    x: 24px;
    y: 0;
  `,

  placeMarker: css`
    > path {
      color: ${colors.secondary};
      transform: scale(0.03) translate(20px, -54px);
    }
  `,

  text: css`
    font-size 12px;
    font-weight: bold;
    font-ize: 24px;
    font-family: ${fonts.tertiary};
    fill: ${colors.WHITE};
  `
});

export default stylesGenerator;
