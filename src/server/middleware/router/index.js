import Router from 'koa-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import AppTemplate from '../../templates/app';

import { match } from 'shared/routing';
import routes from 'shared/routing/routes';

const router = new Router();

router.get('/health', ctx => {
  ctx.status = 200;
});

router.get('*', (ctx, next) => {
  const matched = match(routes, ctx.url);

  if (matched) ctx.state.matchedRoute = matched;

  return next();
});

export default router;
