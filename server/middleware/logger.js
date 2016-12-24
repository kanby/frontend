import { log } from '../util';

export default (ctx, next) => {
  log(`${ctx.request.method} ${ctx.request.path}`);
  next();
};
