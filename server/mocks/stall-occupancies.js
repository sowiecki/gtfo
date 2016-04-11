import { OCCUPIED, VACANT } from '../constants';

const getMockStallOcuppancies = () => (
  [
    { id: 'mensStall1', alert: OCCUPIED, location: 'two-prudential-51' },
    { id: 'mensStall2', alert: VACANT, location: 'two-prudential-51' }
  ]
);

export default getMockStallOcuppancies;
