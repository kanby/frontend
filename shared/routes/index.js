import Inferno from 'inferno';
import { Route, IndexRoute } from 'inferno-router';

import App from 'components/app';
import IndexPage from './index';
import BoardsPage from './boards';

const routes = (
  <Route component={App}>
    <IndexRoute component={IndexPage} />
    <Route path="boards" component={BoardsPage} />
  </Route>
);

export default routes;
