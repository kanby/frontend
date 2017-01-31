/* @flow */

import curry from 'lodash/fp/curry';
import isString from 'lodash/fp/isString';

const validator = curry(
  (message: string, valid: boolean): boolean | string => valid || message,
);

const contains = curry((values: Array<any>, value: any): boolean => {
  if (values.indexOf(value) !== -1) return true;
  return false;
});

export { isString, validator, contains };
