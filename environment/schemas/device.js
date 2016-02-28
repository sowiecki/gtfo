export default {
  title: 'Device Schema',
  id: '/DeviceSchema',
  type: 'object',
  properties: {
    name: { type: 'string' },
    location: { type: 'string' },
    deviceAlias: { type: 'string' },
    deviceId: { type: 'string' },
    deviceAuthToken: { type: 'string' }
  },
  required: ['name', 'location', 'deviceId', 'deviceAuthToken']
};
