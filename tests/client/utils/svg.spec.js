/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { parsePosition, parseShape } from 'utils';

describe('SVG utilities', () => {
  const mockRoomSvg = {
    x: 10.5,
    y: 20.25,
    height: 200,
    width: 300
  };

  describe('parsePosition', () => {
    it('should return parsed position coordinates.', () => {
      expect(parsePosition(mockRoomSvg)).toEqual({ x: '10.5%', y: '20.25%' });
    });
  });

  describe('parseShape', () => {
    it('should return parsed shape parameters.', () => {
      expect(parseShape(mockRoomSvg)).toEqual({ height: '200%', width: '300%' });
    });
  });
});
