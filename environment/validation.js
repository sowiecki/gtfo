import { Validator } from 'jsonschema';

import deviceSchema from './schemas/device';
import markerSchema from './schemas/marker';
import coordinateSchema from './schemas/coordinate';
import filesSchemas from './schemas/files';

const validator = new Validator;

validator.addSchema(deviceSchema, '/DeviceSchema');
validator.addSchema(markerSchema, '/MarkerSchema');
validator.addSchema(coordinateSchema, '/CoordinateSchema');

validator.addSchema(filesSchemas.config, '/ConfigSchema');
validator.addSchema(filesSchemas.devices, '/DevicesSchema');
validator.addSchema(filesSchemas.markers, '/MarkersSchema');
validator.addSchema(filesSchemas.coordinates, '/CoordinatesSchema');

export default validator;
