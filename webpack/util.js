import config from './config';
import mergeWith from 'lodash/mergeWith';

export const env = (e, a, b) => config.get('environment') === e ? a : b;
export const merge = (object, ...sources) => mergeWith(object, ...sources, (
  a,
  b,
) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b);
  }
});
