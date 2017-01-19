import Inferno, { render } from 'inferno';
import { Router } from 'inferno-router';
import routes from 'shared/routes';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'inferno-redux';
import createStore from 'shared/create-store';

const browserHistory = createBrowserHistory();
const initialState = {};
const store = createStore(browserHistory, initialState);
syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV === 'development') {
  store.subscribe(() => {
    console.log(store.getState());
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
