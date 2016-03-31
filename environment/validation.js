import { Validator } from 'jsonschema';
import { forEach } from 'lodash';

import deviceSchema from './schemas/device';
import markerSchema from './schemas/marker';
import coordinateSchema from './schemas/coordinate';
import filesSchemas from './schemas/files';

const validator = new Validator();

const schemas = {
  deviceSchema,
  markerSchema,
  coordinateSchema,
  ...filesSchemas
};

forEach(schemas, (schema) => validator.addSchema(schema, schema.id));

export default validator;
