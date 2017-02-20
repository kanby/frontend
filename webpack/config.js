import childProcess from 'child_process';
import path from 'path';

const config = new Map();

config.set('root', path.join(__dirname, '../'));
config.set('environment', process.env.NODE_ENV || 'development');

config.set(
  'commit-sha',
  childProcess.execSync('git rev-parse HEAD').toString().trim().substr(0, 5)
);

export default config;
