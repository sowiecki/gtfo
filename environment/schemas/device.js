export default {
  title: 'Device Schema',
  id: '/DeviceSchema',
  type: 'object',
  properties: {
    name: { type: 'string' },
    location: { type: 'string' },
    deviceAlias: { type: 'string' },
    deviceId: { type: 'string' },
    deviceAuthToken: { type: 'string' },
    capabilities: {
      type: 'object',
      properties: {
        motion: { type: 'bool' }
      }
    }
  },
  required: ['name', 'location']
};
