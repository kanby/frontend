import Inferno from 'inferno';
import { RouterContext, match } from 'inferno-router';
import compose from 'koa-compose';
import createMemoryHistory from 'history/createMemoryHistory';

const initRouting = routes => (
  (ctx, next) => {
    ctx.state.infernoRouter = {};
    ctx.state.infernoRouter.routes = routes;
    return next();
  }
);

const getRenderProps = (ctx, next) => {
  const state = ctx.state.infernoRouter;
  state.renderProps = match(state.routes, ctx.url);
  return next();
};

const handleRedirects = (ctx, next) => {
  const { renderProps } = ctx.state.infernoRouter;

  if (renderProps && renderProps.redirect) {
    return ctx.redirect(renderProps.redirect);
  }

  return next();
};

const renderBody = (ctx, next) => {
  const { renderProps } = ctx.state.infernoRouter;

  if (renderProps) {
    const props = {
      history: createMemoryHistory(),
      ...renderProps,
    };

    ctx.state.infernoRouter.body = <RouterContext {...props} />;
  }

  return next();
};

const infernoRouter = routes => (
  compose([
    initRouting(routes),
    getRenderProps,
    handleRedirects,
    renderBody,
  ])
);

export { initRouting, getRenderProps, handleRedirects, renderBody };
export default infernoRouter;
