import config from './config';

export const env = (e, a, b) => config.get('environment') === e ? a : b;
