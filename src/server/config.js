import path from 'path';
import config from '../shared/config';

config.set('assets/path', path.join(__dirname, '..', '..', 'dist', config.get('assets/directory')));

export default config;
