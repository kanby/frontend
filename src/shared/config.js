import flow from 'lodash/fp/flow';
import createConfig from 'shared/util/config';
import { contains, isString, validator } from 'shared/util/validators';

const config = createConfig(true);

config.set('environment', (process.env.NODE_ENV || 'development'), flow(contains(['development', 'production']), validator('[val] is not an allowed environment')));
config.set('assets/directory', 'assets', flow(isString, validator('not a string')));

export default config;
