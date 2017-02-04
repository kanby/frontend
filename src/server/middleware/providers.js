import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import RoutingProvider from 'shared/routing/provider';
import createStore from 'shared/create-store';
import { getRoutingProp } from 'shared/routing';

export default (ctx, next) => {
  if (ctx.state.matchedRoute) {
    const { route } = ctx.state.matchedRoute;
    const Component = route.component;

    const store = createStore();

    ctx.state.tree = (
      <StoreProvider store={store}>
        <RoutingProvider routing={getRoutingProp(ctx.state.matchedRoute)}>
          <Component />
        </RoutingProvider>
      </StoreProvider>
    );
  }

  return next();
};
