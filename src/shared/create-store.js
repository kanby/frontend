import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';

const reducers = combineReducers({
  routing: routerReducer,
});

export default function (history, initialState) {
  const reduxRouterMiddleware = routerMiddleware(history);
  return applyMiddleware(reduxRouterMiddleware)(createStore)(reducers, initialState);
}
