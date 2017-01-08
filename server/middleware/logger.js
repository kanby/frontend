import { log } from '../util';

export default (ctx, next) => {
  log(`${ctx.method} ${ctx.url}`);
  return next();
};
