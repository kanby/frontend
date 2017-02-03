import React from 'react';
import { render } from 'react-dom';
import appRoutes from 'shared/routing/routes';
import { match } from 'shared/routing';
import { Provider } from 'react-redux';
import createStore from 'shared/create-store';
import config from 'client/config';

const initialState = {};
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
      <Provider store={store}>
        <route.component routing={routingProps} />
      </Provider>
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
