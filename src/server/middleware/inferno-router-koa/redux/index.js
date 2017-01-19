import Inferno from 'inferno';
import { Provider } from 'inferno-redux';
import compose from 'koa-compose';
import { initRouting, getRenderProps, handleRedirects, renderBody } from '../index';
import initStore from './init-store';

const wrapBody = (ctx, next) => {
  const state = ctx.state.infernoRouter;
  state.body = (
    <Provider store={state.store}>
      {state.body}
    </Provider>
  );

  return next();
};

const infernoRouterRedux = routes => (
  compose([
    initRouting(routes),
    getRenderProps,
    handleRedirects,
    initStore,
    renderBody,
    wrapBody,
  ])
);

export default infernoRouterRedux;

export { wrapBody };
