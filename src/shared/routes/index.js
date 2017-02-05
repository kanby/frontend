import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from 'compositions/layout';
import { Home, Boards, Board } from 'compositions/pages';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="boards" component={Boards} />
    <Route path="boards/:board" component={Board} />
  </Route>
);

export default routes;
