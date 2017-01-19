import { syncHistoryWithStore } from 'react-router-redux';
import createStore from 'shared/create-store';

const initStore = (ctx, next) => {
  const state = ctx.state.infernoRouter;
  const initialState = {};
  state.store = createStore(state.history, initialState);
  syncHistoryWithStore(state.history, state.store);

  return next();
};

export default initStore;
