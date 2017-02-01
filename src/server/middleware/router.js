import Inferno from 'inferno';
import Router from 'koa-router';
import { renderToString } from 'inferno-server';
import AppTemplate from '../templates/app';

import { match } from 'shared/routing';
import routes from 'shared/routing/routes';

const routeHandler = rtr => route => {
  rtr.get(route.path, async (ctx, next) => {
    // Still get params from route.Route
    const params = route.Route.match(ctx.url);

    ctx.body = renderToString(
      <AppTemplate locale="en" title="Kanby">
        <route.component />
      </AppTemplate>,
    );

    ctx.status = 200;

    return next();
  });
};

const router = routes => {
  const rtr = new Router();

  rtr.get('/health', ctx => {
    ctx.status = 200;
  });

  const handler = routeHandler(rtr);
  routes.forEach(handler);

  return rtr;
};

export default router;
