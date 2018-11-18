module.exports = {
  'config.json': {
    config: {
      public: {
        title: 'GTFO Demo',
        enableTemperature: false,
        enableStalls: false
      },
      reservations: {
        host: 'http://localhost:3000',
        path: '/mocks/meetingRoom/all'
      },
      stalls: {
        host: 'http://localhost:3000',
        path: '/mocks/stalls'
      }
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
    rooms: {
      'some room': {
        height: 13,
        width: 12.5,
        x: 35.5,
        y: 26.6
      },
      'another room': {
        height: 13,
        width: 13,
        x: 48.3,
        y: 26.6
      },
      'broom closet': {
        height: 9,
        width: 7.8,
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
