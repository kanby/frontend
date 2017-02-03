import React from 'react';

import { route } from './index';

import { Home, Boards } from 'compositions/pages';

const routes = [route('/', Home), route('/boards', Boards)];

export default routes;
