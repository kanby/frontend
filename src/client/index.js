import React from 'react';
import { render } from 'react-dom';
import { match, getRoutingProp } from 'shared/routing';
import RoutingProvider from 'shared/routing/provider';
import appRoutes from 'shared/routing/routes';
import { Provider as StoreProvider } from 'react-redux';
import createStore from 'shared/create-store';
import config from 'client/config';

const initialState = {}; // TODO: Read server-sent state here.
const store = createStore(initialState);

if (config.get('environment') === 'development') {
  store.subscribe(() => {
    console.log(store.getState());
  });
}

const renderApplication = (routes, url) => {
  const routingProps = match(routes, url);

  if (routingProps) {
    const { route } = routingProps;

    const App = (
      <StoreProvider store={store}>
        <RoutingProvider routing={getRoutingProp(routingProps)}>
          <route.component />
        </RoutingProvider>
      </StoreProvider>
    );

    render(App, document.getElementById('application'));
  }
};

const currentPath = () =>
  `${window.location.pathname}${window.location.search}${window.location.hash}`;

renderApplication(appRoutes, currentPath());

if (module.hot) {
  module.hot.accept('shared/routing/routes', () => {
    const newRoutes = require('shared/routing/routes').default;
    renderApplication(newRoutes, currentPath());
  });
}
