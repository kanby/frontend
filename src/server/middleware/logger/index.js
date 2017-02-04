/* @flow */

import { log } from 'server/util';

export default (ctx: Object, next: Function) => {
  log(`${ctx.method} ${ctx.url}`);
  return next();
};
