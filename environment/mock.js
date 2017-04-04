/**
 * This mock mock environment object is used in place
 * of trying to read JSON files while running tests.
 */

export default {
  config: {
    public: {
      enableMotion: true
    },
    prodReservationsHost: ''
  },
  devices: [
    {
      name: 'Odin',
      location: 'Laythe'
    }
  ],
  markers: [],
  coordinates: {
    laythe: {}
  }
};
