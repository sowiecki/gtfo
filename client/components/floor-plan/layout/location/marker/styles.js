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
      transform: scale(0.05) translate(14px, -38px);
    }
  `,

  text: css`
    font-size 12px;
    font-weight: bold;
    font-ize: 24px;
    font-family: ${fonts.tertiary};
  `
});

export default stylesGenerator;
