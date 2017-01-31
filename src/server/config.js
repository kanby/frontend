// @flow

import { join } from 'path';
import config from 'shared/config';
import flow from 'lodash/fp/flow';
import { warn } from 'server/util';
import { isString, validator } from 'shared/util/validators';

config.logger = warn;

config.set('outpath', join(__dirname, '../../dist'));
config.set(
  'assets/path',
  join(config.get('outpath'), config.get('assets/directory')),
  flow(isString, validator('not a string')),
);
config.set(
  'assets/manifest',
  join(config.get('outpath'), 'manifest.json'),
  flow(isString, validator('not a string')),
);

export default config;
