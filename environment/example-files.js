module.exports = {
  'config.json': {
    config: {
      public: {
        title: 'GTFO Demo',
        enableTemperature: false,
        enableStalls: false
      },
      prodReservationsHost: null
    }
  },
  'devices.json': {
    devices: [
      {
        name: 'Some room',
        location: 'First floor',
        deviceId: '1234abc',
        deviceAuthToken: 'hunter2'
      },
      {
        name: 'Another room',
        location: 'First floor',
        deviceId: '1234abc',
        deviceAuthToken: 'hunter2'
      },
      {
        name: 'Broom closet',
        location: 'First floor',
        deviceId: '1234abc',
        deviceAuthToken: 'hunter2'
      }
    ]
  },
  'coordinates.json': {
    coordinates: {
      'some room': {
        height: 3,
        width: 2.5,
        x: 45.5,
        y: 26.6
      },
      'another room': {
        height: 3,
        width: 3,
        x: 48.3,
        y: 26.6
      },
      'broom closet': {
        height: 3,
        width: 2.5,
        x: 45.5,
        y: 69
      }
    }
  },
  'markers.json': {
    markers: [
      {
        name: 'Reception',
        location: 'First floor',
        type: 'anchor',
        coordinates: {
          x: 54,
          y: 54
        }
      }
    ]
  }
};
