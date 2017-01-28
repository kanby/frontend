import Inferno, { render } from 'inferno';
import { Router } from 'inferno-router';
import routes from 'shared/routes';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'inferno-redux';
import createStore from 'shared/create-store';
import config from 'client/config';

const browserHistory = createBrowserHistory();
const initialState = {};
const store = createStore(browserHistory, initialState);
syncHistoryWithStore(browserHistory, store);

if (config.get('environment') === 'development') {
  store.subscribe(() => {
    console.log(store.getState()); // eslint-disable-line no-console
  });
}

const App = (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
);

render(App, document.getElementById('application'));
