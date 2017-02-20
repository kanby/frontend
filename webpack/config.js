import childProcess from 'child_process';

const config = new Map();

config.set('environment', process.env.NODE_ENV || 'development');

config.set(
  'commit-sha',
  childProcess.execSync('git rev-parse HEAD').toString().trim().substr(0, 5)
);

export default config;
