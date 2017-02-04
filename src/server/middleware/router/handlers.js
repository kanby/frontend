import { match, createMemoryHistory } from 'react-router';
import routes from 'shared/routes';
import createStore from 'shared/create-store';

export const matchApplicationRoutes = (ctx, next) => {
  const memoryHistory = createMemoryHistory(ctx.url);
  const { history, store } = createStore({ history: memoryHistory, initialState: {} });

  match({ history, routes, location: ctx.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.throw(500, error.message);
    } else if (redirectLocation) {
      ctx.url = redirectLocation.pathname + redirectLocation.search;
      ctx.status = 307;
    } else if (renderProps) {
      ctx.state.store = store;
      ctx.state.renderProps = renderProps;
    }

    next();
  });
}

export const healthCheck = ctx => ctx.status = 200;
