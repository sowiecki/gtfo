export default {
  config: {
    title: 'Config Schema',
    id: '/ConfigSchema',
    type: 'object',
    properties: {
      public: {
        properties: {
          title: { type: 'string' },
          timezone: { type: 'number' },
          enableTemperature: { type: 'bool' },
          enableStalls: { type: 'bool' },
          enableMotion: { type: 'bool' },
          enableConfig: { type: 'bool' },
          defaultTempScale: {
            type: 'string',
            enum: ['fahrenheit', 'celcius']
          },
          note: { type: 'string' }
        },
        required: ['timezone']
      },
      proxy: {
        properties: {
          host: { type: 'string' },
          path: { type: 'string' },
          required: ['host']
        }
      },
      reservations: {
        properties: {
          host: { type: 'string' },
          path: { type: 'string' },
          required: ['host']
        }
      },
      stalls: {
        properties: {
          host: { type: 'string' },
          path: { type: 'string' },
          required: ['host']
        }
      }
    },
    required: ['public', 'reservations']
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
