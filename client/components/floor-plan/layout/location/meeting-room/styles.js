import { css } from 'emotion';

import { colors, fonts, breakpoints } from 'components/common/styles';

const svgLabelBaseTransform = 'rotate(45deg)';

const stylesGenerator = () => ({
  base: css`
    font-family: ${fonts.quaternary};
    font-weight: 400;
    font-size: 12px;
    text-shadow: ${colors.GREY} 0px 0px 0px;
    text-transform: uppercase;

    text {
      transform: ${svgLabelBaseTransform} translate(3px, -17px);

      ${breakpoints.mobile} {
        font-size: 6px;
        transform: ${svgLabelBaseTransform} translate(3px, -20px);
      }
    }
  `,

  svgRect: css`
    stroke: ${colors.GHOST_WHITE};
    strokewidth: 1;
  `,

  svgRoomTextConnected: colors.DARK_BLUE,

  svgRoomTextDisconnected: colors.DARK_RED
});

export default stylesGenerator;
