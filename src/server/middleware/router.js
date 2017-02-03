import React from 'react';
import Router from 'koa-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import AppTemplate from '../templates/app';

import { match } from 'shared/routing';
import routes from 'shared/routing/routes';

const routeHandler = rtr => route => {
  rtr.get(route.path, async (ctx, next) => {
    // Still get params from route.Route
    const routingProps = route.Route.match(ctx.url);

    const body = renderToString(<route.component routing={routingProps} />);

    ctx.body = renderToStaticMarkup(
      <AppTemplate locale="en" title="Kanby" body={body} />,
    );

    ctx.status = 200;
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
