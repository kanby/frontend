import { createStore } from 'redux';

const reducer = state => state;

export default initialState => {
  return createStore(reducer, initialState);
};
