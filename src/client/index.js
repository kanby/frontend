import 'nodent-runtime';
import config from 'client/config';
import decode from 'ent/decode';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { match, Router, Route, browserHistory } from 'react-router';
import createStore from 'shared/create-store';
import routes from 'shared/routes';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

const ROOT_NODE = document.getElementById('application');
const STATE_NODE = document.getElementById('application:state');

const initialState = JSON.parse(decode(STATE_NODE.innerText));

const styletron = new Styletron(
  document.getElementsByClassName('_styletron_hydrate_'),
);

const { history, store } = createStore({
  history: browserHistory,
  initialState,
});

if (config.get('environment') === 'development') {
  console.log('initial state:', store.getState());

  store.subscribe(() => {
    console.log('state update:', store.getState());
  });
}

const renderApplication = (routes, url) => {
  match({ history, routes, location: url }, (
    error,
    redirectLocation,
    renderProps,
  ) => {
    if (error) {
      console.error(error.message);
    } else if (redirectLocation) {
      window.location = redirectLocation.pathname + redirectLocation.search;
    } else if (renderProps) {
      const App = (
        <StyletronProvider styletron={styletron}>
          <StoreProvider store={store}>
            <Router {...renderProps} />
          </StoreProvider>
        </StyletronProvider>
      );

      render(App, ROOT_NODE);
    }
  });
};

const currentPath = () =>
  `${window.location.pathname}${window.location.search}${window.location.hash}`;

renderApplication(routes, currentPath());

if (module.hot) {
  module.hot.accept('shared/routes', () => {
    const newRoutes = require('shared/routes').default;
    unmountComponentAtNode(ROOT_NODE);
    renderApplication(newRoutes, currentPath());
  });
}
