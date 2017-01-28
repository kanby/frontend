/* @flow */

import { log } from '../util';

export default (ctx: Object, next: Function) => {
  log(`${ctx.method} ${ctx.url}`);
  return next();
};
