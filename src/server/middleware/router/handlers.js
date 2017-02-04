import { match } from 'shared/routing';
import routes from 'shared/routing/routes';

export const matchApplicationRoutes = (ctx, next) => {
  const matched = match(routes, ctx.url);

  if (matched) ctx.state.matchedRoute = matched;

  return next();
}

export const healthCheck = ctx => ctx.status = 200;
