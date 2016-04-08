/**
 * When running with mocks enabled,
 * this service responds with mocked
 * reservation data to simulate the
 * functionality of ems_wrapper.
 */
import getMockData from '../mocks/mock-data';

const mocksController = {
  reservationsByRoom(res, req) {
    const { roomId } = req.params;
    const mockData = getMockData();

    res.json(mockData[roomId]);
  },

  stalls(res, req) {
    res.json({ id: 'meh', foo: 'bar', biz: 'baz' });
  }
};

export default mocksController;
