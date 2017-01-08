import Inferno, { render } from 'inferno';
import { Router } from 'inferno-router';
import routes from 'shared/routes';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

const App = (
  <Router history={browserHistory}>
    {routes}
  </Router>
);

render(App, document.getElementById('application'));
