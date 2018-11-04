import { css } from 'emotion';

import { fonts, breakpoints } from 'components/common/styles';

const svgLabelBaseTransform = 'rotate(45deg)';

const stylesGenerator = () => ({
  base: css`
    text {
      font-size: 10px;
      font-family: ${fonts.secondary};
      opacity: 0.85;
      transform: ${svgLabelBaseTransform} translate(18px, -28px);

      ${breakpoints.mobile} {
        font-size: 4px;
        transform: ${svgLabelBaseTransform} translate(8px, -36px);
      }
    }
  `
});

export default stylesGenerator;
