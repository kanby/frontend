import { createStore, combineReducers } from 'redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';

export default ({ history, initialState }) => {
  const reducer = combineReducers({
    routing: routerReducer
  });

  const store = createStore(reducer, initialState);

  return { history: syncHistoryWithStore(history, store), store };
};
