import config from 'client/config';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { match, Router, Route, browserHistory } from 'react-router';
import createStore from 'shared/create-store';
import routes from 'shared/routes';
console.log('hello, world');

const initialState = {}; // TODO: Read server-sent state here.
const { history, store } = createStore({ history: browserHistory, initialState });

if (config.get('environment') === 'development') {
  store.subscribe(() => {
    console.log(store.getState());
  });
}

const renderApplication = (routes, url) => {
  match({ history, routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error(error.message)
    } else if (redirectLocation) {
      window.location = redirectLocation.pathname + redirectLocation.search;
    } else if (renderProps) {
      const App = (
        <Provider store={store}>
          <Router {...renderProps} />
        </Provider>
      );

      render(App, document.getElementById('application'));
    }
  })
};

const currentPath = () =>
  `${window.location.pathname}${window.location.search}${window.location.hash}`;

renderApplication(routes, currentPath());

if (module.hot) {
  module.hot.accept('shared/routing/routes', () => {
    const newRoutes = require('shared/routing/routes').default;
    renderApplication(newRoutes, currentPath());
  });
}
