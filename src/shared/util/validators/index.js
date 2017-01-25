import curry from 'lodash/fp/curry';
import isString from 'lodash/fp/isString';

const validator = curry((message, valid) => valid || message);

export { isString, validator };