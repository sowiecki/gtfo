export default {
  config: {
    title: 'Config Schema',
    id: '/ConfigSchema',
    type: 'object',
    properties: {
      productionHost: { type: 'string' }
    },
    required: ['productionHost']
  },
  devices: {
    title: 'Devices Schema',
    id: '/DevicesSchema',
    type: 'array',
    items: { $ref: '/DeviceSchema' }
  },
  markers: {
    title: 'Markers Schema',
    id: '/MarkersSchema',
    type: 'array',
    items: { $ref: '/MarkerSchema' }
  },
  coordinates: {
    title: 'Coordinates Schema',
    id: '/CoordinatesSchema',
    type: 'object',
    additionalProperties: { $ref: '/CoordinateSchema' }
  }
};
