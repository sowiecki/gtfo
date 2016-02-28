export default {
  title: 'Marker Schema',
  id: '/MarkerSchema',
  type: 'object',
  properties: {
    name: { type: 'string' },
    location: { type: 'string' },
    type: { type: 'string' },
    coordinates: {
      type: 'object',
      items: {
        x: { type: 'number' },
        y: { type: 'number' }
      }
    }
  },
  required: ['name', 'location', 'type', 'coordinates']
};
