import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';
import { RouterContext } from 'react-router';

export default (ctx, next) => {
  if (ctx.state.renderProps) {
    const styletron = ctx.state.styletron = new Styletron();
    const store = ctx.state.store;

    ctx.state.tree = (
      <StyletronProvider styletron={styletron}>
        <StoreProvider store={store}>
          <RouterContext {...ctx.state.renderProps} />
        </StoreProvider>
      </StyletronProvider>
    );
  }

  return next();
};
