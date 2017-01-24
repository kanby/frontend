import createConfig from 'shared/util/config';
import { isString } from 'shared/util/validators';

const config = createConfig(true);

config.set('assets/directory', 'assets', isString);

export default config;
