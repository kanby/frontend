import path from 'path';
import config from 'shared/config';
import flow from 'lodash/fp/flow';
import { warn } from 'server/util';
import { isString, validator } from 'shared/util/validators';

config.logger = warn;

config.set('assets/path', path.join(__dirname, '../../dist', config.get('assets/directory')), flow(isString, validator('not a string')));

export default config;
