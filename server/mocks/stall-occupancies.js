import { OCCUPIED, VACANT } from '../constants';

const getMockStallOcuppancies = () => (
  [{ id: 'mensStall1', status: OCCUPIED }, { id: 'mensStall2', status: VACANT }]
);

export default getMockStallOcuppancies;
