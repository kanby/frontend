import Inferno from 'inferno';
import { Route, IndexRoute } from 'inferno-router';

import App from 'components/app';
import HomePage from './home';
import BoardsPage from './boards';

const routes = (
  <Route component={App}>
    <IndexRoute component={HomePage} />
    <Route path="boards" component={BoardsPage} />
  </Route>
);

export default routes;
