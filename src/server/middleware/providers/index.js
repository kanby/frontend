import React from 'react';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

export default (ctx, next) => {
  if (ctx.state.renderProps) {
    const store = ctx.state.store;

    ctx.state.tree = (
      <Provider store={store}>
        <RouterContext {...ctx.state.renderProps} />
      </Provider>
    );
  }

  return next();
};
